import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function DashboardLayout() {
  const router = useRouter();
  const { user, loading } = useAuth(); // This must be unconditional

  useEffect(() => {
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
    return null; // This is okay because no hooks are called after this
  }

  return <Stack />; // All hooks must be called before any conditional returns
}