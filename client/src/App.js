// Need to do:
//    - Search company's name
//    - get range of that company's stock price

import { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';


// Components
import BarChart from './components/Charts/BarChart';
import LineChart from './components/Charts/LineChart';
import SearchBar from './components/SearchBar';







// For Cors error
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const stockUrl = `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/GME`
// async function getStocks() {
//     const response = await fetch(stockUrl);
//     return response.json();
// }



function App() {
  // const [price, setPrice] = useState("loading");
  // const [priceTime, setPriceTime] = useState(null);

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
      <h2>Member: Alex, David, Riley, Sang June</h2>



      <div className="price">
        {/* {price} */}
        {/* <br/> */}
        {/* {priceTime && priceTime.toLocaleTimeString()} */}
      </div>

      <div style={{ margin: 10 }}>
        <SearchBar/>

      </div>
    
      
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{
            padding: 5,
            color: "green"
          }}>Bar-Chart</span>
        </Link>

        <Link to="/LineChart" style={{ textDecoration: 'none' }}>
        <span style={{
            padding: 5,
            color: "blue"
          }}>Line-Chart</span>
        </Link>
      </nav>
      

      
    


    
    <Routes>
      <Route path="/" element={<BarChart/>}/>
      <Route path="/LineChart" element={<LineChart/>}/>
    </Routes>
    
      
      
      
    </div>
  );
}

export default App;
