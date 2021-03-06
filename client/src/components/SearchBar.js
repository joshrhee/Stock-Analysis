import { useState } from "react";

import { useDispatch } from 'react-redux';

import axios from "axios";


function SearchBar(props) {
    const API_URL = "https://ucf2tbkrc8.execute-api.us-east-1.amazonaws.com/dev"

    const [companyName, setCompanyName] = useState("");
    let dispatch = useDispatch();


    const getStockInfo = async (companyName) => {

        await axios.get(`${API_URL}/getcompanystock/${companyName}`)
        .then(res => {
            console.log("res: ", res)
            
            dispatch({
                type: "GET_STOCK_INFO",
                payload: {
                    adjClosePostCovid: res.data.adjClosePostCovid,
                    adjClosePreCovid: res.data.adjClosePreCovid,
                    datesPreCovid: res.data.datesPreCovid,
                    datesPostCovid: res.data.datesPostCovid
                }
            });
        })
        .catch(err => {
            console.log(err)
        })
    }



    const inputChanged = (event) => {
        setCompanyName(event.currentTarget.value)
    }


    return(
        <div>
            <label htmlFor="company-search">
                <span className="company-search" style={{color:"red", fontWeight: "bold"}}>Comapny ticker: </span>
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
                onChange={inputChanged}
            />

            <button
                style={{
                    margin: 10,
                    borderRadius: 5
                }}
                onClick={(e) => {getStockInfo(companyName)}}
            >Search</button>

            <p
                style={{
                    margin: 10,
                }}
            >
                Ticker: {companyName}
            </p>


        </div>
    )
}


export default SearchBar;
