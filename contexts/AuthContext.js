import { createContext, useState, useContext, useEffect } from "react";
import { Client, Account, ID } from "appwrite";
import * as SecureStore from 'expo-secure-store';
import { createUserProfile } from '../lib/userApi';

// And make sure your userApi.js has the correct database IDs:
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID; // Get from Appwrite
const USERS_COLLECTION_ID = process.env.EXPO_PUBLIC_USERS_COLLECTION_ID; // Get from Appwrite

const AppwriteContext = createContext();

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with true for initial check

  // Check authentication status when app starts
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
      setLoading(false); // Always set loading to false when done checking
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      
      // Save session to secure storage
      await SecureStore.setItemAsync('user_session', JSON.stringify({
        userId: currentUser.$id,
        email: currentUser.email
      }));
      
      return { success: true, user: currentUser };
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, error: error.message };
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
    
    // 1. Create user in Appwrite Auth
    const authUser = await account.create(ID.unique(), email, password, name);
    console.log("Auth user created:", authUser);
    
    // 2. Login the user
    const loginResult = await login(email, password);
    
    if (loginResult.success) {
      // 3. CRITICAL: Create user profile in YOUR Users collection
      try {
        await createUserProfile(authUser.$id, name, email);
        console.log("User profile created in database");
      } catch (profileError) {
        console.error("Failed to create user profile:", profileError);
      }
      
      return { success: true, user: loginResult.user };
    } else {
      return { success: false, error: loginResult.error };
    }
  } catch (error) {
    console.error("SignUp Error:", error);
    return { success: false, error: error.message };
  } finally {
    setLoading(false);
  }
};

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      await SecureStore.deleteItemAsync('user_session');
    } catch (error) {
      console.error("Logout Error:", error);
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