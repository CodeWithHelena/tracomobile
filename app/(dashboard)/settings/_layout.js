import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
         // DISABLE ALL HEADERS - we're using custom PageHeader component
        headerShown: false,
        // Keep navigation gestures enabled
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        animation: 'slide_from_right',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // REMOVE presentation: 'modal'
        // Enable native iOS swipe gestures
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        // Use default stack animation (slide from right)
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Settings',
          // Enable back button and swipe gesture
          headerLeft: () => null, // This hides the back button on the main settings page
        }} 
      />
      <Stack.Screen 
        name="change-password" 
        options={{ 
          title: 'Change Password',
          headerBackTitle: 'Back',
          // Enable swipe back gesture
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
        }} 
      />
    </Stack>
  );
}