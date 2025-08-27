// app/auth/forgotPassword.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from "expo-router";
import ThemedText from '../../components/ThemedText';
import ThemedInput from '../../components/ThemedInput';
import ThemedButton from '../../components/ThemedButton';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const submit = () => {
    // call API to send OTP
    navigation.navigate('VerifyOTP', { email });
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, backgroundColor: Colors.light.background}}>
          <View style={[styles.header, { backgroundColor: Colors.gradientStart }]}>
            <ThemedText title style={styles.brand}>Traco</ThemedText>
          </View>

          <View style={styles.card}>
            <ThemedText title style={styles.formTextTitle}>Forgot password</ThemedText>
            <ThemedText style={styles.formTextSubTitle}>Enter email to receive verification code</ThemedText>

            <ThemedInput placeholder="Email Address" keyboardType="email-address" value={email} onChangeText={setEmail} />

            <ThemedButton style={{marginTop: 12}} title="Continue" onPress={submit} />


            <TouchableOpacity  onPress={() => router.push("/(auth)/login")}>
              <ThemedText style={styles.linkBackArrow}>← Back to login</ThemedText>

            </TouchableOpacity>
            <TouchableOpacity  onPress={() => router.push("/(auth)/verifyOtp")}>
              <ThemedText style={styles.linkBackArrow}>verify otp</ThemedText>

            </TouchableOpacity>
             <TouchableOpacity  onPress={() => router.push("/(auth)/resetPassword")}>
              <ThemedText style={styles.linkBackArrow}>reset password</ThemedText>

            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { height: 270, alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  brand: { fontSize: 34, color: '#fff', fontWeight: '700' },
  card: {
    flex: 1,
    marginTop: -32,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingTop: 45,
  },
  formTextTitle: { 
    fontSize: 30, 
    fontWeight: '700', 
    textAlign: 'center' 
  },
  formTextSubTitle: { 
    marginTop: 10, 
    marginBottom: 30, 
    fontSize: 17, 
    fontWeight: '500', 
    textAlign: 'center',  
    color: 'gray'
  },
  linkBackArrow: {
    textAlign: 'center',
    color: Colors.primary,
    marginTop: 12,
  },
});
