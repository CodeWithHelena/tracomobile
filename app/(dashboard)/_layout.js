// app/(dashboard)/_layout.js
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardTabBar from '../../components/dashboard/DashboardTabBar';

export default function DashboardLayout() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace('/(auth)/login');
  }, [user, loading]);

  if (loading) return null;
  if (!user) return null;

  return (
    <Tabs
      screenOptions={
        { headerShown: false,
          tabBarStyle: {
          backgroundColor: "#F5F6FA", // your design bg color
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        }
         }
        
      }
      tabBar={(props) => <DashboardTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="today" options={{ title: "Today's" }} />
      <Tabs.Screen name="add" options={{ title: 'Add' }} />
      <Tabs.Screen name="all" options={{ title: 'All' }} />
      <Tabs.Screen name="profile" options={{ title: 'profile' }} />
    </Tabs>
  );
}
