import type { SignUpInput, SignInInput, AuthResponse } from "@/types";
import api from "../api";

export async function postSignUp(data: SignUpInput): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/signUp", data);
  return res.data;
}

export async function postSignIn(data: SignInInput): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/signIn", data);
  return res.data;
}

export async function refreshToken(): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/refresh-token");
  return res.data;
}
