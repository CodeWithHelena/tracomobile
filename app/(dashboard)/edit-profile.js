// app/(dashboard)/edit-profile.js
import React, { useState, useRef } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  PanResponder,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { usePreferredColorScheme } from '../../contexts/ThemeContext';
import ProfileAvatar from '../../components/dashboard/ProfileAvatar';
import ThemedInput from '../../components/ThemedInput';
import ThemedButton from '../../components/ThemedButton';
import ThemedText from '../../components/ThemedText';
import s from '../../styles/dashboardStyles/profile';

export default function EditProfile() {
  const router = useRouter();
  const scheme = usePreferredColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  const [name, setName] = useState('Johan Hjort');
  const [email, setEmail] = useState('johan@example.com');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [picture, setPicture] = useState(null);

  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > Math.abs(g.dy) && g.dx > 10,
      onPanResponderMove: Animated.event([null, { dx: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (_, g) => {
        if (g.dx > 80) {
          router.back();
        } else {
          Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
        }
      },
    }),
  ).current;

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return alert('Permission required to select image');
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!res.cancelled) setPicture(res.uri);
  };

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View style={{ flex: 1, transform: [{ translateX: pan }] }} {...panResponder.panHandlers}>
            {/* Header with centered title and back arrow */}
            <View style={[s.subHeader, { backgroundColor: Colors.gradientStart, paddingTop: Platform.OS === 'ios' ? 12 : 10 }]}>
              <TouchableOpacity onPress={() => router.back()} style={s.backWrap}>
                <Ionicons name="chevron-back" size={22} color="#fff" />
              </TouchableOpacity>
              <ThemedText title style={s.subHeaderTitle}>Edit Profile</ThemedText>
              <View style={{ width: 44 }} />{/* placeholder to center title */}
            </View>

            <View style={s.content}>
              <View style={{ alignItems: 'center', marginTop: 16 }}>
                <TouchableOpacity onPress={pickImage}>
                  <View style={{ position: 'relative' }}>
                    <ProfileAvatar size={96} uri={picture} />
                    <View style={s.cameraBadge}>
                      <Ionicons name="camera" size={16} color="#fff" />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 18 }}>
                <ThemedText style={s.fieldLabel}>Full name</ThemedText>
                <ThemedInput value={name} onChangeText={setName} placeholder="Full name" />

                <ThemedText style={[s.fieldLabel, { marginTop: 12 }]}>Email</ThemedText>
                <ThemedInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

                <ThemedText style={[s.fieldLabel, { marginTop: 12 }]}>Date of birth</ThemedText>
                <ThemedInput value={dob} onChangeText={setDob} placeholder="DD / MM / YYYY" />

                <ThemedText style={[s.fieldLabel, { marginTop: 12 }]}>Phone</ThemedText>
                <ThemedInput value={phone} onChangeText={setPhone} placeholder="+234 800 000 0000" />
              </View>

              <View style={{ marginTop: 22 }}>
                <ThemedButton title="Update Profile" onPress={() => alert('Updated (stub)')} />
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
