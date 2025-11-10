// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // initially null

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData); // store user info in memory
    localStorage.setItem("user", JSON.stringify(userData)); // persist in localStorage
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // clear from localStorage
    localStorage.removeItem("token"); // if using token-based auth
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
