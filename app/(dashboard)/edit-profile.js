import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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
import PageHeader from '../../components/dashboard/PageHeader';
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

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return alert('Permission required to select image');
    const res = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      quality: 0.7 
    });
    if (!res.canceled) setPicture(res.assets[0].uri);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/* Use the new header component - it will handle status bar */}
            <PageHeader title="Edit Profile" />
            
            <ScrollView 
              contentContainerStyle={[s.content, { paddingBottom: 40 }]}
              showsVerticalScrollIndicator={false}
              // Add padding to account for header height
              style={{ marginTop: -20 }} // Adjust this value as needed
            >
              <View style={{ alignItems: 'center', marginTop: 36 }}>
                <TouchableOpacity onPress={pickImage}>
                  <View style={{ position: 'relative' }}>
                    <ProfileAvatar size={96} uri={picture} />
                    <View style={s.cameraBadge}>
                      <Ionicons name="camera" size={16} color="#fff" />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 24 }}>
                <ThemedText style={s.fieldLabel}>Full name</ThemedText>
                <ThemedInput 
                  value={name} 
                  onChangeText={setName} 
                  placeholder="Full name" 
                  placeholderTextColor={theme.inputPlaceholder}
                borderColor={theme.inputBorder}
                />

                <ThemedText style={[s.fieldLabel, { marginTop: 12 }]}>Email</ThemedText>
                <ThemedInput 
                  value={email} 
                  onChangeText={setEmail} 
                  placeholder="Email" 
                  placeholderTextColor={theme.inputPlaceholder}
                borderColor={theme.inputBorder}
                  keyboardType="email-address" 
                />
                

                <ThemedText style={[s.fieldLabel, { marginTop: 12 }]}>Date of birth</ThemedText>
                <ThemedInput 
                  value={dob} 
                  onChangeText={setDob} 
                  placeholder="DD / MM / YYYY" 
                  placeholderTextColor={theme.inputPlaceholder}
                borderColor={theme.inputBorder}
                />

                <ThemedText style={[s.fieldLabel, { marginTop: 12 }]}>Phone</ThemedText>
                <ThemedInput 
                  value={phone} 
                  onChangeText={setPhone} 
                  placeholder="+234 800 000 0000" 
                  keyboardType="phone-pad"
                  placeholderTextColor={theme.inputPlaceholder}
                borderColor={theme.inputBorder}
                />
              </View>

              <View style={{ marginTop: 32 }}>
                <ThemedButton 
                  title="Update Profile" 
                  onPress={() => alert('Updated (stub)')} 
                />
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}