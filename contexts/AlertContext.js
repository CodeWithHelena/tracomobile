import React, { createContext, useState, useContext } from 'react';
const AlertContext = createContext();
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    visible: false,
    message: '',
    type: 'success'
  });
  const showAlert = (message, type = 'success') => {
    setAlert({ visible: true, message, type });
  };
  const hideAlert = () => {
    setAlert(prev => ({ ...prev, visible: false }));
  };
  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};