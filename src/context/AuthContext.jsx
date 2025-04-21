import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8080/account", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
      } else {
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", "false");
      }
    } catch (err) {
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", "false");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const result = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(result === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const logout = async () => {
    try{   
      const response = await axios.post("http://localhost:8080/logout", {
        Credential:"includes"
      });
  
      console.log(response);
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated",false)
      navigate("/")
      
    }catch(err){
      navigate("/")
      console.log(err);
    }
    
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    logout
  };

  return (
    <authContext.Provider value={value}>
      { children}
    </authContext.Provider>
  );
};

export default AuthProvider;
