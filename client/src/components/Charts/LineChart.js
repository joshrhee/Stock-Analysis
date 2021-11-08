import { useState, useEffect } from 'react';

// https://github.com/apexcharts/react-apexcharts
import Chart from 'react-apexcharts';





const chart = {
options: {
    chart: {
    id: 'apexchart-example',
    },
    xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
},
series: [
    {
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    },
    {
        name: 'series-2',
        data: [40, 60, 85, 50, 79, 80, 50, 11, 100]
    }
]
}


function LineChart() {
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



