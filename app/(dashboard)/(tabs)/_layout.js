import { Tabs } from 'expo-router';
import DashboardTabBar from '../../../components/dashboard/DashboardTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F5F6FA",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        }
      }}
      tabBar={(props) => <DashboardTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="today" options={{ title: "Today's" }} />
      <Tabs.Screen name="add" options={{ title: 'Add' }} />
      <Tabs.Screen name="all" options={{ title: 'All' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}