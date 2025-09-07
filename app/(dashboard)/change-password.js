// app/(dashboard)/change-password.js
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  PanResponder,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ThemedInput from '../../components/ThemedInput';
import ThemedButton from '../../components/ThemedButton';
import ThemedText from '../../components/ThemedText';
import { Colors } from '../../constants/Colors';
import { usePreferredColorScheme } from '../../contexts/ThemeContext';
import s from '../../styles/dashboardStyles/profile';

export default function ChangePassword() {
  const router = useRouter();
  const scheme = usePreferredColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const pan = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > Math.abs(g.dy) && g.dx > 10,
      onPanResponderMove: Animated.event([null, { dx: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (_, g) => {
        if (g.dx > 80) router.back();
        else Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
      },
    }),
  ).current;

  const onSave = () => {
    if (!newPass || newPass !== confirm) return alert('Passwords do not match');
    alert('Password updated (stub)');
    router.back();
  };

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View style={{ flex: 1, transform: [{ translateX: pan }] }} {...panResponder.panHandlers}>
            <View style={[s.subHeader, { backgroundColor: Colors.gradientStart }]}>
              <TouchableOpacity onPress={() => router.back()} style={s.backWrap}>
                <Ionicons name="chevron-back" size={22} color="#fff" />
              </TouchableOpacity>
              <ThemedText title style={s.subHeaderTitle}>Change Password</ThemedText>
              <View style={{ width: 44 }} />
            </View>

            <View style={s.content}>
              <ThemedInput placeholder="Old password" value={oldPass} onChangeText={setOldPass} secureTextEntry />
              <ThemedInput placeholder="New password" value={newPass} onChangeText={setNewPass} secureTextEntry />
              <ThemedInput placeholder="Confirm new password" value={confirm} onChangeText={setConfirm} secureTextEntry />

              <View style={{ marginTop: 16 }}>
                <ThemedButton title="Save" onPress={onSave} />
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
