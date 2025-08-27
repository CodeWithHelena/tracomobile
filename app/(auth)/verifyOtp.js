// app/auth/verifyOtp.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { useRouter } from "expo-router";
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';

export default function VerifyOTP() {
  const navigation = useNavigation();
  const router = useRouter();

  
  const { email } = router.params || {};
  const [code, setCode] = useState('');

  const submit = () => {
    // verify code with API; on success navigate to ResetPassword
    navigation.navigate('ResetPassword', { email });
  };

  const resend = () => {
    // trigger resend code
    alert('Verification code resent to ' + (email || 'your email'));
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, backgroundColor: Colors.light.background}}>
          <View style={[styles.header, { backgroundColor: Colors.gradientStart }]}>
            <ThemedText title style={styles.brand}>Traco</ThemedText>
          </View>

          <View style={styles.card}>
            <ThemedText title style={{ fontSize: 20 }}>Verify Your Email to Begin</ThemedText>
            <ThemedText style={{ marginTop: 8 }}>Enter the 6-digit Verification code</ThemedText>

            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="123456"
              keyboardType="number-pad"
              maxLength={6}
              style={styles.otp}
            />

            <ThemedButton title="Continue" onPress={submit} />

            <TouchableOpacity onPress={resend} style={{ marginTop: 12 }}>
              <ThemedText>Didn't receive any code? Resend Code</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { height: 130, alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  brand: { fontSize: 34, color: '#fff', fontWeight: '700' },
  card: {
    flex: 1,
    marginTop: -32,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    alignItems: 'center'
  },
  otp: {
    width: '80%',
    textAlign: 'center',
    fontSize: 22,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 16,
    marginBottom: 8
  }
});
