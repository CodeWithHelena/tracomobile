// app/auth/login.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../../components/ThemedText';
import ThemedInput from '../../components/ThemedInput';
import ThemedPasswordInput from '../../components/ThemedPasswordInput';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../../contexts/AuthContext';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    // validate then call signIn
    signIn({ email });
    navigation.replace('Home'); // go to protected screen
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.header}>
            <ThemedText title style={styles.brand}>Traco</ThemedText>
            <View style={styles.btnLinkWrapper}>
              <ThemedText style={styles.btnLinkText}>Don't have an account?</ThemedText>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <ThemedText style={styles.btnLink} onPress={() => router.push("/(auth)/register")}>Sign Up</ThemedText>
            </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.card}>
            <ThemedText title style={styles.formTextTitle}>Welcome Back</ThemedText>
            <ThemedText style={styles.formTextSubTitle}>Enter your details below</ThemedText>

            <ThemedInput placeholder="Email Address" keyboardType="email-address" value={email} onChangeText={setEmail} />
            <ThemedPasswordInput placeholder="Password" value={password} onChangeText={setPassword} />

            <ThemedButton title="Sign in" onPress={submit} style={{ marginTop: 12 }} />

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ marginTop: 12 }}>
              <ThemedText style={{ textAlign: 'center' }} onPress={() => router.push("/(auth)/forgotPassword")}>Forgot your password?</ThemedText>

            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: { height: 270, backgroundColor: Colors.gradientStart, alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  brand: { fontSize: 34, color: '#fff', fontWeight: '700' },
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
    marginBottom: 16, 
    fontSize: 17, 
    fontWeight: '500', 
    textAlign: 'center',  
    color: 'gray'
  },
});
