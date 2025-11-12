import axios from "axios";

const BaseUrl = "http://localhost:4000";
const api = axios.create({
  baseURL: BaseUrl,
});

export default api;
