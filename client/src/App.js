import { Route, Routes, Link } from 'react-router-dom';
import './App.css';


// Components
import BarChart from './components/Charts/BarChart';
import LineChart from './components/Charts/LineChart';
import SearchBar from './components/SearchBar';




function App() {

  return (
    <div className="App">
      <h2>Member: Alex, David, Riley, Sang June</h2>

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

      <p
        style={{
          marginTop: 30,
          marginBottom: 30,
          color: "skyblue",
          fontWeight: "bold"
        }}
      >
        Please wait a couple of seconds for the data to load.
      </p>
    
    <Routes>
      <Route path="/" element={<BarChart/>}/>
      <Route path="/LineChart" element={<LineChart/>}/>
    </Routes>

    
    
      
      
      
    </div>
  );
}

export default App;
