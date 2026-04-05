import React, { createContext, useState } from 'react';
import Toast from '../components/common/Toast';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const[toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast toast={toast} />
    </ToastContext.Provider>
  );
};