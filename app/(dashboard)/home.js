// app/(dashboard)/home.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Home() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              // Redirect to login page after successful logout
              router.replace('/(auth)/login');
            } else {
              Alert.alert("Error", result.error || "Failed to sign out");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ThemedText title style={styles.welcomeText}>
        Welcome {user?.name || 'User'}!
      </ThemedText>
      
      <ThemedText style={styles.emailText}>
        Email: {user?.email}
      </ThemedText>

      <ThemedButton
        title={loading ? "Signing Out..." : "Sign Out"}
        onPress={handleSignOut}
        disabled={loading}
        style={styles.signOutButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20
  },
  welcomeText: { 
    fontSize: 24, 
    marginBottom: 10,
    textAlign: 'center'
  },
  emailText: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.7
  },
  signOutButton: {
    marginTop: 20,
    minWidth: 120
  }
});