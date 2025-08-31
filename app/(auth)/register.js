import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import ThemedText from '../../components/ThemedText';
import ThemedInput from '../../components/ThemedInput';
import ThemedPasswordInput from '../../components/ThemedPasswordInput';
import ThemedButton from '../../components/ThemedButton';
import SafeThemedAlert from '../../components/SafeThemedAlert';
import InlineMessage from '../../components/InlineMessage';
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer';
import { useAuth } from '../../contexts/AuthContext';
import { Colors } from '../../constants/Colors';
import { useAlert } from '../../contexts/AlertContext';

export default function Register() {
  const router = useRouter();
  const { register, loading } = useAuth();
  const { showAlert } = useAlert();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateForm = () => {
  let isValid = true;

  if (!name) {
    setNameError('Full name is required');
    isValid = false;
  } else {
    setNameError('');
  }

  if (!email) {
    setEmailError('Email is required');
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    setEmailError('Please enter a valid email');
    isValid = false;
  } else {
    setEmailError('');
  }

  if (!password) {
    setPasswordError('Password is required');
    isValid = false;
  } else if (password.length < 8) { // Change from 6 to 8 to match Appwrite requirements
    setPasswordError('Password must be at least 8 characters');
    isValid = false;
  } else {
    setPasswordError('');
  }

  if (!confirmPassword) {
    setConfirmPasswordError('Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    setConfirmPasswordError('Passwords do not match');
    isValid = false;
  } else {
    setConfirmPasswordError('');
  }

  return isValid;
};

  const submit = async () => {
  Keyboard.dismiss();
  
  if (!validateForm()) {
    return;
  }

  try {
    await register(email, password, name);
    showAlert('Registration successful! Redirecting...', 'success');
    setTimeout(() => {
      router.replace('/(dashboard)/home');
    }, 1500);
  } catch (error) {
    console.error("Registration error:", error); // Keep original error in console
    
    let errorMessage = 'An unexpected error occurred. Please try again.';
    
    if (error.message) {
      // Handle specific Appwrite error messages
      const errorMsg = error.message;
      
      if (errorMsg.includes('Rate limit')) {
        errorMessage = 'Too many registration attempts. Please try again in a few minutes.';
      } 
      else if (errorMsg.includes('already exist') || errorMsg.includes('already exists')) {
        errorMessage = 'This email is already registered. Please try logging in instead.';
      }
      else if (errorMsg.includes('password') && errorMsg.includes('8')) {
        errorMessage = 'Password must be at least 8 characters long.';
      }
      else if (errorMsg.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address.';
      }
      else if (errorMsg.includes('Network Error') || errorMsg.includes('Connection')) {
        errorMessage = 'Network connection error. Please check your internet and try again.';
      }
    }
    
    showAlert(errorMessage, 'error');
  }
};

  return (
    <KeyboardAvoidingContainer style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <SafeThemedAlert />

          <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.header}>
            <ThemedText title style={styles.brand}>Traco</ThemedText>
            <View style={styles.btnLinkWrapper}>
              <ThemedText style={styles.btnLinkText}>Already have an account?</ThemedText>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <ThemedText style={styles.btnLink}>Sign In</ThemedText>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.card}>
            <ThemedText title style={styles.formTextTitle}>Get started free.</ThemedText>
            <ThemedText style={styles.formTextSubTitle}>Free forever. No credit card needed.</ThemedText>

            <ThemedInput 
              placeholder="Full name" 
              value={name} 
              onChangeText={(text) => {
                setName(text);
                setNameError('');
              }}
              error={!!nameError}
            />
            <InlineMessage
              type="error"
              message={nameError}
              visible={!!nameError}
            />

            <ThemedInput 
              placeholder="Email Address" 
              keyboardType="email-address" 
              value={email} 
              onChangeText={(text) => {
                setEmail(text);
                setEmailError('');
              }}
              autoCapitalize="none"
               error={!!emailError} 
            />
            <InlineMessage
              type="error"
              message={emailError}
              visible={!!emailError}
            />

            <ThemedPasswordInput 
              placeholder="Password" 
              value={password} 
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              }}
              error={!!passwordError} 
            />
            <InlineMessage
              type="error"
              message={passwordError}
              visible={!!passwordError}
            />

            <ThemedPasswordInput 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChangeText={(text) => {
                setConfirmPassword(text);
                setConfirmPasswordError('');
              }}
              error={!!confirmPasswordError}
            />
            <InlineMessage
              type="error"
              message={confirmPasswordError}
              visible={!!confirmPasswordError}
            />

            <ThemedButton 
              title={loading ? "Creating Account..." : "Sign up"} 
              onPress={submit} 
              style={{ marginTop: 20 }} 
              disabled={loading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.light.background 
  },
  header: { 
    height: 270, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 40 
  },
  brand: { 
    fontSize: 34, 
    color: '#fff', 
    fontWeight: '700' 
  },
  btnLinkWrapper: {
    position: 'absolute',
    right: 18,
    top: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnLink: { 
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  btnLinkText: {
    color: '#c5bfbfff',
    fontSize: 16,
    marginRight: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingTop: 45,
    marginTop: -32,
  },
  formTextTitle: { 
    fontSize: 30, 
    fontWeight: '700', 
    textAlign: 'center' 
  },
  formTextSubTitle: { 
    marginTop: 10, 
    marginBottom: 16, 
    fontSize: 17, 
    fontWeight: '500', 
    textAlign: 'center',  
    color: 'gray' 
  },
});