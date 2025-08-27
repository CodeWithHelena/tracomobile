import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
// import your authentication check logic here

export default function DashboardLayout() {
  const router = useRouter();

  useEffect(() => {
    // Replace this with your real authentication check
    const isLoggedIn = false; // e.g., check from context or storage

    if (!isLoggedIn) {
      router.replace('/(auth)/login');
    }
  }, []);

  return <Stack />;
}