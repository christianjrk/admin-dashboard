import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  useEffect(() => {
    if (token) {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
      } catch {
        // ignore
      }
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      setToken(token);
      setUser(user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", { name, email, password });
      return true;
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
