import { createContext, useState, useContext, useEffect } from "react";
import { Client, Account, ID } from "appwrite";
import * as SecureStore from 'expo-secure-store';
const AppwriteContext = createContext();
const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);
const account = new Account(client);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkAuthStatus();
  }, []);
  const checkAuthStatus = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const login = async (email, password) => {
    setLoading(true);
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      
      await SecureStore.setItemAsync('user_session', JSON.stringify({
        userId: currentUser.$id,
        email: currentUser.email
      }));
      
      return currentUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const register = async (email, password, name) => {
    setLoading(true);
    try {
      if (!email || !password || !name) {
        throw new Error("All fields are required");
      }
      
      await account.create(ID.unique(), email, password, name);
      // After creating the account, log the user in
      const user = await login(email, password);
      return user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      await account.deleteSession("current");
      setUser(null);
      await SecureStore.deleteItemAsync('user_session');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppwriteContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      checkAuthStatus 
    }}>
      {children}
    </AppwriteContext.Provider>
  );
};
export const useAuth = () => useContext(AppwriteContext);