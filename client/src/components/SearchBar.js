import { useState } from "react";
import { getStock } from "../api";


function SearchBar() {

    const [companyName, setCompanyName] = useState("");
    const [stockData, setStockData] = useState([]);

    const handleSubmit = (event) => {
        // event.preventDefault();
        getStock(companyName)
        .then(res => {
            console.log("SearchBar getStock api result: ", res);
            setStockData(res)
        })
        .catch(err => {
            console.log("SearchBar getStock api error: ", err);
        })
    }

    const handleChange = (event) => {
        setCompanyName(event.currentTarget.value)
    }

    return(
        <div>
            <label htmlFor="company-search">
                <span className="company-search" style={{color:"red", fontWeight: "bold"}}>Comapny name: </span>
            </label>
            
            <input
                style={{
                    borderRadius: 5
                }}
                type="text"
                id={companyName}
                name={companyName}
                value={companyName}
                placeholder="Search company"
                onChange={handleChange}
            />
            
            <button 
                style={{
                    margin: 10,
                    borderRadius: 5
                }}
                onClick={(e) => {handleSubmit(e)}}
            >Search</button>

            <br/>

            {"Company: " + companyName}
            <br/>
            {"Stock Data: " + stockData}

        </div>
    )
}

export default SearchBar;