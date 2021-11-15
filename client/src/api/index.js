import axios from "axios";

const API_URL = "https://pmn46fc45d.execute-api.us-east-1.amazonaws.com/dev"
const api = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        "Content-Type": "application/json"
    }
})

export const getStock = async (companyName) => { 
    api.get(`/getcompanystock/${companyName}`) 
}