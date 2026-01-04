import axios, { type AxiosInstance } from "axios";

const BASE_URL: string = "https://panda-market-api.vercel.app";
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default api;
