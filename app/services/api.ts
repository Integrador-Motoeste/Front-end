import axios from "axios";

const url = process.env.EXPO_PUBLIC_BACKEND_URL as string;

if (!url) {
  throw new Error("EXPO_PUBLIC_BACKEND_URL não está definida");
}

const BASE_URL = `${url}`;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});