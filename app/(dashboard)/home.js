// app/dashboard/home.js
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ThemedText from '../../components/ThemedText';
import { useAuth } from '../../contexts/AuthContext';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <ThemedText title style={{ fontSize: 22 }}>Welcome {user?.name || 'User'}</ThemedText>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center' }
});
