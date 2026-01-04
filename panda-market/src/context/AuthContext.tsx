"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User, SignInInput, AuthResponse } from "@/types";
import * as authApi from "@/lib/api/auth";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  login: (data: SignInInput) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

   useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");

        if (storedUser && accessToken) {
          setUser(JSON.parse(storedUser));
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (data: SignInInput) => {
    try {
      const response: AuthResponse = await authApi.postSignIn(data);
      const { user, accessToken, refreshToken } = response;

      setUser(user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      router.push("/"); 
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/signIn");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
