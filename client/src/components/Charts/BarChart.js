import Chart from 'react-apexcharts';

import { useSelector } from 'react-redux';

function BarChart(props) {


    var chart = {
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


        let dates = [];
        for (let i = 0; i < reduxState.reducer.dates1.length; i++) {
            dates.push(reduxState.reducer.dates1[i]);
        }
        for (let i = 0; i < reduxState.reducer.dates2.length; i++) {
            dates.push(reduxState.reducer.dates2[i]);
        }

        
        let closedPrice = [];
        for (let i = 0; i < reduxState.reducer.adjClose1.length; i++) {
            closedPrice.push(reduxState.reducer.adjClose1[i]);
        }
        for (let i = 0; i < reduxState.reducer.adjClose2.length; i++) {
            closedPrice.push(reduxState.reducer.adjClose2[i]);
        }


        let averagePrice = [];
        let currSum = 0;
        for (let i = 0; i < closedPrice.length; i++) {
            currSum += closedPrice[i];
            averagePrice.push(currSum / (i + 1));
        }

        chart.options.xaxis.categories = dates;

        chart.series.push({name: "Closed Price", data: closedPrice});

        chart.series.push({name: "Average Price", data: averagePrice});

        return(
            <Chart 
                options={chart.options} 
                series={chart.series} 
                type="bar" 
                width={window.innerWidth} 
                height={window.innerHeight/2} 
            />
        )
}

export default BarChart;



