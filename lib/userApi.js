import { databases } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

const DATABASE_ID = "your_database_id";
const USERS_COLLECTION_ID = "your_users_collection_id";

export async function createUserProfile(userId, fullName, email, profileImage = null) {
  return databases.createDocument(
    DATABASE_ID,
    USERS_COLLECTION_ID,
    ID.unique(),
    {
      userId,
      fullName,
      email,
      profileImage,
      settings: { notificationsEnabled: true, emailEnabled: true, darkMode: false }
    }
  );
}
