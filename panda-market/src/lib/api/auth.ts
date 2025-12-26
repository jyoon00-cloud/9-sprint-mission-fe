import api from "../api";

export async function postSignUp(data = {}) {
  const res = await api.post("/auth/signUp", data);
  return res.data;
}
export async function postSignIn(data = {}) {
  const res = await api.post("/auth/signIn", data);
  return res.data;
}
export async function refreshToken() {
  const res = await api.post("/auth/refresh-token");
  return res.data;
}
