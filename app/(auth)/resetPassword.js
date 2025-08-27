// app/auth/resetPassword.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import ThemedText from '../../components/ThemedText';
import ThemedPasswordInput from '../../components/ThemedPasswordInput';
import ThemedButton from '../../components/ThemedButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';

export default function ResetPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const submit = () => {
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    // call API to reset
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, backgroundColor: Colors.light.background}}>
          <View style={[styles.header, { backgroundColor: Colors.gradientStart }]}>
            <ThemedText title style={styles.brand}>Traco</ThemedText>
          </View>

          <View style={styles.card}>
            <ThemedText title style={{ fontSize: 20 }}>Reset password</ThemedText>
            <ThemedText style={{ marginTop: 8 }}>Enter new password</ThemedText>

            <ThemedPasswordInput placeholder="Password" value={password} onChangeText={setPassword} />
            <ThemedPasswordInput placeholder="Confirm Password" value={confirm} onChangeText={setConfirm} />

            <ThemedButton title="Continue" onPress={submit} />

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 12 }}>
              <ThemedText>← Back to login</ThemedText>
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
  },
});
