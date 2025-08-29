// app/auth/verifyOtp.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { Colors } from '../../constants/Colors';

export default function VerifyOTP() {
  const { email } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <ThemedText title>Verify Your Email</ThemedText>
      <ThemedText style={{ marginTop: 10, textAlign: 'center' }}>
        We've sent a verification link to {email}. Please check your inbox and click the link to verify your account.
      </ThemedText>
      <ThemedButton title="Back to Login" onPress={() => router.replace('/(auth)/login')} style={{ marginTop: 20 }} />
    </View>
  );
}
