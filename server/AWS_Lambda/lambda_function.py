import json
import boto3
import datetime
import csv
from urllib.request import urlopen
from boto3.dynamodb.conditions import Key, Attr
from datetime import date

def updateRollingAverage(ave, old_sample, new_sample, range):
    ave = ave - (old_sample / range);
    ave = ave + (new_sample / range);
    return ave;





REGION="us-east-1"
dynamodb = boto3.resource('dynamodb',region_name=REGION)
table = dynamodb.Table('Stocks')

def lambda_handler(event, context):

    #default running average range is 100
    N = 100;
    #tickerName=['body-json']['companyName']
    tickerName = 'NVDA' #update this with the actual stock ticker from the user data

    #start and end dates of both graphs in string and datetime formats. Again, grab these from user data
    dates = ['2019-01-01', '2019-12-31', '2020-01-01', '2020-12-31']
    dateTimes = [date.fromisoformat(dates[0]), date.fromisoformat(dates[1]), date.fromisoformat(dates[2]), date.fromisoformat(dates[3])]
    index = []

    #scan table to see if stock data already exists
    response = table.scan(
            FilterExpression=Attr('Ticker').contains(str(tickerName))
    )

    items = response['Items']
    if items:
        print('response was:')
        print(items)
        #need to write code to pass data back to user from DB
        return
    else:
         #user is doing an initial search! so we return the default range data to the user and submit a spark job to put the rest in the DB
        dateTimes = [date.fromisoformat('2019-03-01'), date.fromisoformat('2020-02-29'), date.fromisoformat('2020-03-01'), date.fromisoformat('2021-02-28')]

    #get stock data from yahoo, put in stockData
    url = 'https://query1.finance.yahoo.com/v7/finance/download/' + tickerName + '?period1=0&period2=99999999999&interval=1d&events=history&includeAdjustedClose=true'
    response = urlopen(url)
    lines = [l.decode('utf-8') for l in response.readlines()]
    headers = lines.pop(0)
    stockData = list(csv.reader(lines))

    for dateT in dateTimes:
        #starting date is before first available stock date, throw error
        if (dateT < date.fromisoformat(stockData[0][0])):
                return {
                "success": 0,
                "errorMessage": 'invalid date'
                }

        #grab index of date in stock data
        for i in range(len(stockData)):
            if (dateT <= date.fromisoformat(stockData[i][0])):
                index.append(i)
                break;

    #initializations
    avg = 0
    dateV = [[], []]
    adjclose = [[], []]
    avgRun = [[], []]
    minDate = stockData[0][0]

    #the below code can be cleaned up a LOT but it works as far as I can tell so ¯\_(ツ)_/¯

    #first graph loop to calculate running average and put dates, closing prices, and running average into lists to be used for json
    for i in range(index[0], (index[1]+1)):
        if ((i - (N - 1)) < 0):
            sum = 0
            for j in range(0, (i + 1)):
                sum = sum + float(stockData[j][5])
            avgRun[0].append(sum / i)
        #enough data! calculate the running avg!
        else:
            if avg == 0:
                sum = 0
                for j in range((i - (N - 1)), (i + 1)):
                    sum = sum + float(stockData[j][5])
                avg = sum / N
            else:
                avg = updateRollingAverage(avg, float(stockData[i - N][5]), float(stockData[i][5]), N)
            avgRun[0].append(avg)
        dateV[0].append(stockData[i][0])
        adjclose[0].append(float(stockData[i][5]))

    #second graph loop to calculate running average and put dates, closing prices, and running average into lists to be used for json
    for i in range(index[2], (index[3]+1)):
        #not enough data for 100 day avg so we just do normal avg for available points
        if ((i - (N - 1)) < 0):
            sum = 0
            for j in range(0, (i + 1)):
                sum = sum + float(stockData[j][5])

            #put normal avg in running avg list
            avgRun[1].append(sum / i)
        #enough data! calculate the running avg!
        else:
            #running avg hasn't been calculated yet, so we do initial calc
            if avg == 0:
                sum = 0
                for j in range((i - (N - 1)), (i + 1)):
                    sum = sum + float(stockData[j][5])
                avg = sum / N
            #running avg has been calculated before, so we simply update it
            else:
                avg = updateRollingAverage(avg, float(stockData[i - N][5]), float(stockData[i][5]), N)

            #put running avg in avg list
            avgRun[1].append(avg)

        #put dates and adjusted close price into lists
        dateV[1].append(stockData[i][0])
        adjclose[1].append(float(stockData[i][5]))

        #send job to glue to calculate running avg for all data and put in dynamoDB
        glueClient = boto3.client('glue', region_name='us-east-1')
        response = glueClient.start_job_run(JobName = 'TestProject', Arguments = {'--Ticker': tickerName, "--runningAvgSize": str(N)})
        print(response)

        return {
            "statusCode": 200,
            "dates1": dateV[0],
            "adjClose1": adjclose[0],
            "avgRun1": avgRun[0],
            "dates2": dateV[1],
            "adjClose2": adjclose[1],
            "avgRun2": avgRun[1],
            "minDate": minDate
        }
