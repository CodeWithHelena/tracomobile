import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Import your auth context
import { View, ActivityIndicator } from 'react-native'; // For loading state

export default function DashboardLayout() {
  const router = useRouter();
  const { user, loading } = useAuth(); // Get user and loading state from context

  useEffect(() => {
    // Only redirect if we're done loading AND there's no user
    if (!loading && !user) {
      router.replace('/(auth)/login');
    }
  }, [user, loading, router]);

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Don't render the dashboard if not authenticated
  if (!user) {
    return null; // or you could return a different component
  }

  return <Stack />;
}