// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { authenticateUser } from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const login = async (credentials, isRegister = false) => {
    await authenticateUser(credentials);
    setIsLoggedIn(true);
    showToast(isRegister ? "Account created successfully!" : "Welcome back!", "success");
    
    if (pendingRedirect) {
      const redirect = pendingRedirect;
      setPendingRedirect(null);
      navigate(redirect);
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast("You have been logged out.", "info");
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, pendingRedirect, setPendingRedirect }}>
      {children}
    </AuthContext.Provider>
  );
};