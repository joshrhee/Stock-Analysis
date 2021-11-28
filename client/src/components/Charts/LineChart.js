import React from 'react';
import Chart from 'react-apexcharts';

import { useSelector } from 'react-redux';


function LineChart(props) {

    var chart = {
        options: {
            chart: {
            id: 'apexchart-example'
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
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
        
        let averagePrice = [];
        let currSum = 0;
        for (let i = 0; i < reduxState.reducer.ClosedPrice.length; i++) {
            currSum += reduxState.reducer.ClosedPrice[i];
            averagePrice.push(currSum / (i + 1));
        }

        chart.series.push({name: "Closed Price", data: reduxState.reducer.ClosedPrice});
        chart.series.push({name: "Average Price", data: averagePrice});

        


        return(
            <Chart 
                options={chart.options} 
                series={chart.series} 
                type="line" 
                width={window.innerWidth} 
                height={window.innerHeight/2} 
            />
        )
}


export default LineChart;



