import { databases } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

const DATABASE_ID = "your_database_id";
const TASKS_COLLECTION_ID = "your_tasks_collection_id";

export async function createTask(userId, title, description) {
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
