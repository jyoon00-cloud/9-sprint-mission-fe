import axios from "axios";

const BaseUrl = "http://localhost:3000";
const api = axios.create({
  baseURL: BaseUrl,
});

export default api;
