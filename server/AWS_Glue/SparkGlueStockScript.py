from pyspark import SparkContext, SparkFiles, sql
from pyspark.sql import SparkSession, SQLContext
from urllib.request import urlopen
import csv
from pyspark.sql.window import Window
from pyspark.sql import functions as func
import sys
from awsglue.utils import getResolvedOptions
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal
import boto3

#setup dynamodb table
REGION="us-east-1"
dynamodb = boto3.resource('dynamodb',region_name=REGION)
table = dynamodb.Table('Stocks')

#turn days into seconds
days = lambda i: i * 86400

#get ticker name and running average length from lambda call
options = ['Ticker', 'runningAvgSize']
args = getResolvedOptions(sys.argv, options)
tickerName = args['Ticker']
runningAvgSize = int(args['runningAvgSize'])


#get stock data from yahoo finance for ticker
url = 'https://query1.finance.yahoo.com/v7/finance/download/' + tickerName + '?period1=0&period2=99999999999&interval=1d&events=history&includeAdjustedClose=true'
response = urlopen(url)
lines = [l.decode('utf-8') for l in response.readlines()]   
stockData = list(csv.reader(lines))

#pop headers for later and rename adj close header
headers = stockData.pop(0)
headers[5] = "Adj_Close"

#create spark job
sc = SparkContext("local", "Simple App")
sqlContext = sql.SQLContext(sc)

#put data from stockData into dataframe
df = sc.parallelize(stockData).toDF(headers)

#turn dates into seconds and sort df by range of running average size
df = df.withColumn('DateSec', df.Date.cast('timestamp'))
windowSpec = Window.orderBy(func.col("DateSec").cast('long')).rangeBetween(-days(runningAvgSize - 1), 0)

#calculate running average
df = df.withColumn('running_avg', func.avg("Adj_Close").over(windowSpec)) 

#update windowspec for momentum calculation
windowSpec = Window.orderBy(func.col("DateSec").cast('long'))

#get 10th value back from current value, then subtract 10th value from current value to get momentum
df = df.withColumn("prev_10th_val", func.lag(df.Adj_Close, 10).over(windowSpec))
df = df.withColumn("momentum", func.when(func.isnull(df.Adj_Close - df.prev_10th_val), 0).otherwise(df.Adj_Close - df.prev_10th_val))

#pop unneeded data columns that were used for calculations
df = df.drop('DateSec')
df = df.drop("prev_10th_val")
df.show()

#this can be sped up by doing batch pushes of df to dynamoDB but hey, again, it works at least!
for row in df.collect():
    table.put_item(
        Item={                        
            "Ticker": tickerName,
            "Date": row["Date"],
            "Open": row["Open"],
            "High": row["High"],
            "Low": row["Low"],
            "Close": row["Close"],
            "Adj_Close": row["Adj_Close"],
            "Volume": row["Volume"],
            "running_avg": Decimal(row["running_avg"]).quantize(Decimal('1.000000')),
            "momentum": Decimal(row["momentum"]).quantize(Decimal('1.000000')),
    }
)