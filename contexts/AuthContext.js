// contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // replace with real auth logic

  const signIn = (userData) => {
    setUser(userData || { name: 'Demo User', email: 'demo@traco.app' });
  };

  const signOut = () => setUser(null);

  const signUp = (data) => {
    // call your API; for demo we set user
    setUser({ name: data.name, email: data.email });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
