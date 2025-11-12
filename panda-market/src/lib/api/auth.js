import axios from "axios";

const BASE_URL = " https://panda-market-api.vercel.app";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

async function postSignUp(data = {}) {
  const res = await api.post("/auth/signUp", data);
  return res.data;
}
async function postSignIn(data = {}) {
  const res = await api.post("/auth/signIn", data);
  return res.data;
}
async function refreshToken() {
  const res = await api.post("/auth/refresh-token");
  return res.data;
}

export const authService = {
  postSignUp,
  postSignIn,
  refreshToken,
};
