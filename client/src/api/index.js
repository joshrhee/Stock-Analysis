import axios from "axios";

const API_URL = "https://pmn46fc45d.execute-api.us-east-1.amazonaws.com/dev"

export const getStock = async (companyName) => { 
    axios.get(`${API_URL}/getcompanystock/${companyName}`) 
}