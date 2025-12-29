import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("access")
  );

  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!accessToken;

  // login via central api so baseURL/env are respected
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await api.post("token/", { username, password });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      setAccessToken(response.data.access);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      await api.post('register/', { username, email, password });
      // auto-login after successful registration
      await login(username, password);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
    // redirect to login
    window.location.href = "/login";
  };

  // Keep local state in sync with localStorage
  useEffect(() => {
    const handler = () => setAccessToken(localStorage.getItem("access"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
