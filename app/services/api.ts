import axios from "axios";

const url = process.env.EXPO_PUBLIC_BACKEND_URL as string

const BASE_URL =  `${url}/api/`

export const api = axios.create({
    baseURL: BASE_URL
});