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
import { useColorScheme } from 'react-native';
import { getAuthStyles } from '../../styles/authStyles';

export default function Login() {
  const { showAlert } = useAlert(); 
  const router = useRouter();
  const { login, loading } = useAuth();

  const colorScheme = useColorScheme();
  const authStyles = getAuthStyles(colorScheme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
  let isValid = true;

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
  } else {
    setPasswordError('');
    // Don't validate password length on login - just check if it exists
    // The server will handle the actual authentication
  }

  return isValid;
};

const submit = async () => {
  Keyboard.dismiss();
  
  if (!validateForm()) {
    return;
  }

  try {
    const user = await login(email, password);
    showAlert('Login successful! Redirecting...', 'success');
    setTimeout(() => {
      router.replace('/(dashboard)/home');
    }, 1500);
  } catch (error) {
    console.error("Login error:", error); // Keep original error in console
    
    let errorMessage = 'An unexpected error occurred. Please try again.';
    
    if (error.message) {
      // Handle specific Appwrite error messages
      const errorMsg = error.message;
      
      if (errorMsg.includes('Rate limit')) {
        errorMessage = 'Too many login attempts. Please try again in a few minutes.';
      } 
      else if (errorMsg.includes('Invalid credentials') || errorMsg.includes('password') || errorMsg.includes('email')) {
        errorMessage = 'Incorrect email or password. Please try again.';
      }
      else if (errorMsg.includes('Network Error') || errorMsg.includes('Connection')) {
        errorMessage = 'Network connection error. Please check your internet and try again.';
      }
      else if (errorMsg.includes('session') || errorMsg.includes('Session')) {
        errorMessage = 'Session error. Please try logging in again.';
      }
    }
    
    showAlert(errorMessage, 'error');
  }
};

  return (
    <KeyboardAvoidingContainer style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={authStyles.container}>
          <SafeThemedAlert />

          <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={authStyles.header}>
            <ThemedText title style={authStyles.brand}>Traco</ThemedText>
            <View style={authStyles.btnLinkWrapper}>
              <ThemedText style={authStyles.btnLinkText}>Don't have an account?</ThemedText>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <ThemedText style={authStyles.btnLink}>Sign Up</ThemedText>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={authStyles.card}>
            <ThemedText title style={authStyles.formTextTitle}>Welcome Back</ThemedText>
            <ThemedText style={authStyles.formTextSubTitle}>Enter your details below</ThemedText>

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
              onSubmitEditing={() => {
                // Move to password input when pressing enter
                this.passwordInput.focus();
              }}
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
              ref={(input) => { this.passwordInput = input; }}
              onSubmitEditing={submit}
            />
            <InlineMessage
              type="error"
              message={passwordError}
              visible={!!passwordError}
            />

            <ThemedButton 
              title={loading ? "Signing In..." : "Sign in"} 
              onPress={submit} 
              style={{ marginTop: 20 }} 
              disabled={loading}
            />


            <TouchableOpacity onPress={() => router.push("/(auth)/forgotPassword")} style={{ marginTop: 16 }}>
              <ThemedText style={{ textAlign: 'center', color: Colors.primary }}>
                Forgot your password?
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
 
});