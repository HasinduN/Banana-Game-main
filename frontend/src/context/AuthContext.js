import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage if available
  const [auth, setAuth] = useState(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    return storedAuth ? storedAuth : { isAuthenticated: false, user: null };
  });

  // Save to localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const login = (userData) => {
    setAuth({ isAuthenticated: true, user: userData });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


