import axios from "axios";


const BASE_URL =  "http://192.168.0.9:8000/api/"

export const api = axios.create({
    baseURL: BASE_URL
});