// Need to do:
//    - Search company's name
//    - get range of that company's stock price

import { useState, useEffect } from 'react';
import './App.css';

// https://github.com/apexcharts/react-apexcharts
import Chart from 'react-apexcharts';

// For Cors error
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const stockUrl = `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/GME`
// async function getStocks() {
//     const response = await fetch(stockUrl);
//     return response.json();
// }



const chart = {
  options: {
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  },
  series: [{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }]
}


function App() {
  const [price, setPrice] = useState("loading");
  const [priceTime, setPriceTime] = useState(null);

  useEffect(() => {

    // let timeoutId;
    // async function getLatestPrice() {
    //   const data = await getStocks();
    //   const gme = data.chart.result[0];
    //   setPrice(gme.meta.regularMarketPrice.toFixed(2))
    //   setPriceTime(new Date(gme.meta.regularMarketTime * 1000))
    //   // calling getLatestPrice() self again in every 5 seconds.
    //   timeoutId = setTimeout(getLatestPrice, 5000);
    // }

    // // calling getLatestPrice() every 5 seconds.
    // timeoutId = setTimeout(getLatestPrice, 5000);

    // return () => {
    //   clearTimeout(timeoutId)
    // }

  }, []);


  return (
    <div className="App">
      <h2>Member: Alex, David, Rile, Sang June</h2>
      <div className="price">
        {/* {price} */}
        {/* <br/> */}
        {/* {priceTime && priceTime.toLocaleTimeString()} */}
      </div>

      <Chart options={chart.options} series={chart.series} type="bar" width={window.innerWidth} height={320} />
    </div>
  );
}

export default App;
