import { databases } from "../lib/appwrite";
import { ID } from "appwrite";

// Read directly from .env
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
const TASKS_COLLECTION_ID = process.env.EXPO_PUBLIC_TASKS_COLLECTION_ID;

export async function createTask(userId, title, description) {
  if (!DATABASE_ID || !TASKS_COLLECTION_ID) {
    throw new Error("Database configuration missing. Please check your .env file");
  }

  return databases.createDocument(
    DATABASE_ID,
    TASKS_COLLECTION_ID,
    ID.unique(),
    {
      userId,
      title,
      description,
      status: "pending",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  );
}