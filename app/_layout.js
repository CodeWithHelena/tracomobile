import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext'; // adjust path if needed
import { useAuth } from '../contexts/AuthContext';



export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}