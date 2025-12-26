import axios from "axios";

const BASE_URL = "https://panda-market-api.vercel.app";
const api = axios.create({
  baseURL: BASE_URL,
});
