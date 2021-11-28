import Chart from 'react-apexcharts';

import { useSelector } from 'react-redux';

function BarChart(props) {


    var preCovidChart = {
        options: {
            chart: {
            id: 'apexchart-example'
            },
            xaxis: {
                categories: []
            },
            yaxis: {
                labels: {
                formatter: function (value) {
                    return "$" + value;
                }
                },
            }
        },
        series: []
    }

    var postCovidChart = {
        options: {
            chart: {
            id: 'apexchart-example'
            },
            xaxis: {
                categories: []
            },
            yaxis: {
                labels: {
                formatter: function (value) {
                    return "$" + value;
                }
                },
            }
        },
        series: []
    }

        let reduxState = useSelector(state => state);

        let preCovidDates = reduxState.reducer.datesPreCovid;
        let postCovidDates = reduxState.reducer.datesPostCovid;

        let preCovidCount = 0;
        let postCovidCount = 0;
        if (preCovidDates !== undefined) {
            preCovidCount = preCovidDates.length;
            postCovidCount = postCovidDates.length;
        }
        


        let closedPrice = [];
        for (let i = 0; i < reduxState.reducer.adjClosePreCovid.length; i++) {
            closedPrice.push(reduxState.reducer.adjClosePreCovid[i]);
        }
        for (let i = 0; i < reduxState.reducer.adjClosePostCovid.length; i++) {
            closedPrice.push(reduxState.reducer.adjClosePostCovid[i]);
        }

        
        let preCovidClosedPrice = [];
        let postCovidClosedPrice = [];
        for (let i = 0; i < closedPrice.length; i++) {
            if (preCovidCount > 0) {
                preCovidClosedPrice.push(closedPrice[i]);
                preCovidCount--;
                continue
            }
            postCovidClosedPrice.push(closedPrice[i]);
        }
        
        
        let averagePreCovidPrice = [];
        let averagePostCovidPrice = [];

        let currSum = 0;
        for (let i = 0; i < preCovidClosedPrice.length; i++) {
            currSum += preCovidClosedPrice[i];
            averagePreCovidPrice.push(currSum / (i + 1));
        }

        currSum = 0;
        for (let i = 0; i < postCovidClosedPrice.length; i++) {
            currSum += postCovidClosedPrice[i];
            averagePostCovidPrice.push(currSum / (i + 1));
        }

        preCovidChart.options.xaxis.categories = preCovidDates;
        postCovidChart.options.xaxis.categories = postCovidDates;

        preCovidChart.series.push({name: "Closed Price", data: preCovidClosedPrice});
        postCovidChart.series.push({name: "Closed Price", data: postCovidClosedPrice});

        preCovidChart.series.push({name: "Average Price", data: averagePreCovidPrice});
        postCovidChart.series.push({name: "Average Price", data: averagePostCovidPrice});


        return(
            <div>
                <h2>Pre-Covid</h2>
                <Chart 
                    options={preCovidChart.options} 
                    series={preCovidChart.series} 
                    type="bar" 
                    width={window.innerWidth} 
                    height={window.innerHeight/2} 
                />
                <h2>Post-Covid</h2>
                <Chart 
                    options={postCovidChart.options} 
                    series={postCovidChart.series} 
                    type="bar" 
                    width={window.innerWidth} 
                    height={window.innerHeight/2} 
                />
            </div>
            
            
        )
}

export default BarChart;



