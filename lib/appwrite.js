import { Client, Account, Databases } from 'appwrite';

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  console.error("Appwrite environment variables are missing:", { endpoint, projectId });
}

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };