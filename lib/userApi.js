import { databases } from "../lib/appwrite";
import { ID } from "appwrite";
import Constants from 'expo-constants';

// Read from .env via Expo Constants
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
const USERS_COLLECTION_ID = process.env.EXPO_PUBLIC_USERS_COLLECTION_ID;

export async function createUserProfile(userId, fullName, email, profileImage = null) {
  console.log("Reading from .env:", { 
    DATABASE_ID, 
    USERS_COLLECTION_ID 
  });
  
  if (!DATABASE_ID || !USERS_COLLECTION_ID) {
    console.error("Missing database config. Please check your .env file");
    throw new Error("Database configuration missing. Please check your .env file");
  }

  try {
    const result = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        fullName,
        email,
        profileImage,
        settings: JSON.stringify({ 
          notificationsEnabled: true, 
          emailEnabled: true, 
          darkMode: false 
        })
      }
    );
    
    console.log("User profile created successfully");
    return result;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}