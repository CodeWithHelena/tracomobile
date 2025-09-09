import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace('/(auth)/login');
  }, [user, loading]);

  if (loading) return null;
  if (!user) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Main tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* All subpages - NO modal presentation */}
      <Stack.Screen 
        name="edit-profile" 
        options={{ 
          title: 'Edit Profile',
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
        }} 
      />
      <Stack.Screen 
        name="my-favourites" 
        options={{ 
          title: 'My Favourites',
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
        }} 
      />
      <Stack.Screen 
        name="my-history" 
        options={{ 
          title: 'My History',
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
        }} 
      />
    </Stack>
  );
}