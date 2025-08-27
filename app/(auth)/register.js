// app/auth/register.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import ThemedText from '../../components/ThemedText';
import ThemedInput from '../../components/ThemedInput';
import ThemedPasswordInput from '../../components/ThemedPasswordInput';
import ThemedButton from '../../components/ThemedButton';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const navigation = useNavigation();
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submit = () => {
    signUp({ name, email });
    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.header}>
            <ThemedText title style={styles.brand}>Traco</ThemedText>
            <View style={styles.btnLinkWrapper}>
              <ThemedText style={styles.btnLinkText}>Already have an account?</ThemedText>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <ThemedText style={styles.btnLink} onPress={() => router.push("/(auth)/login")}>Sign In</ThemedText>
            </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.card}>
            <ThemedText title style={styles.formTextTitle}>Get started free.</ThemedText>


            <ThemedText style={styles.formTextSubTitle}>Free forever. No credit card needed.</ThemedText>



            
            <ThemedInput placeholder="Full name" value={name} onChangeText={setName} />
            <ThemedInput placeholder="Email Address" keyboardType="email-address" value={email} onChangeText={setEmail} />
            <ThemedPasswordInput placeholder="Password" value={password} onChangeText={setPassword} />
            <ThemedPasswordInput placeholder="Confirm Password" value={password} onChangeText={setConfirmPassword} />
            <ThemedText style={{ color: 'red' }}>Password must be at least 6 characters</ThemedText>


            <ThemedButton title="Sign up" onPress={submit} style={{ marginTop: 18 }} />

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
