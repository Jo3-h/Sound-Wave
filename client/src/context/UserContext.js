import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if there is a user session when the app loads
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user"); // Check if user data is stored in localStorage
    const token = localStorage.getItem("token");
    if (loggedInUser && token) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser); // If yes, set the user state
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user"); // Remove invalid user data from localStorage
      }
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token); // Store token in localStorage
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data from localStorage
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  const signup = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token); // Store token in localStorage
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
  };

  const updateUserDetails = (updatedDetails) => {
    // Merge updated details into the current user object
    console.log("Attempting to update user details");
    console.log("user", user);
    console.log("updatedDetails", updatedDetails);
    const updatedUser = { ...user, ...updatedDetails };
    setUser(updatedUser);

    // Update localStorage with the new user details
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, signup, updateUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};
