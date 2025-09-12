import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import ThemedInput from '../../../components/ThemedInput';
import ThemedButton from '../../../components/ThemedButton';
import ThemedText from '../../../components/ThemedText';
import PageHeader from '../../../components/dashboard/PageHeader';
import { Colors } from '../../../constants/Colors';
import { usePreferredColorScheme } from '../../../contexts/ThemeContext';
import s from '../../../styles/dashboardStyles/profile';

export default function ChangePassword() {
  const router = useRouter();
  const scheme = usePreferredColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSave = () => {
    if (!oldPass) return alert('Please enter your current password');
    if (!newPass) return alert('Please enter a new password');
    if (newPass.length < 6) return alert('Password must be at least 6 characters');
    if (newPass !== confirm) return alert('Passwords do not match');
    
    alert('Password updated successfully!');
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.card }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/*Header component */}
            <PageHeader title="Change Password" />
            
            <ScrollView 
              contentContainerStyle={[s.contentCard, { paddingBottom: 40, paddingTop: 24, backgroundColor: theme.card }]}
              showsVerticalScrollIndicator={false}
            >
              <ThemedText style={[s.fieldLabel, { marginBottom: 8 }]}>
                Current Password
              </ThemedText>
              <ThemedInput 
                placeholder="Enter current password" 
                value={oldPass} 
                onChangeText={setOldPass} 
                secureTextEntry={!showOldPass}
                placeholderTextColor={theme.inputPlaceholder}
                borderColor={theme.inputBorder}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowOldPass(!showOldPass)}>
                    <ThemedText style={{ color: Colors.primary, fontWeight: '600' }}>
                      {showOldPass ? 'Hide' : 'Show'}
                    </ThemedText>
                  </TouchableOpacity>
                }
              />

              <ThemedText style={[s.fieldLabel, { marginTop: 16, marginBottom: 8 }]}>
                New Password
              </ThemedText>
              <ThemedInput 
                placeholder="Enter new password" 
                value={newPass} 
                onChangeText={setNewPass} 
                secureTextEntry={!showNewPass}
                placeholderTextColor={theme.inputPlaceholder}
                borderColor={theme.inputBorder}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
                    <ThemedText style={{ color: Colors.primary, fontWeight: '600' }}>
                      {showNewPass ? 'Hide' : 'Show'}
                    </ThemedText>
                  </TouchableOpacity>
                }
              />

              <ThemedText style={[s.fieldLabel, { marginTop: 16, marginBottom: 8 }]}>
                Confirm New Password
              </ThemedText>
              <ThemedInput 
                placeholder="Confirm new password" 
                value={confirm} 
                onChangeText={setConfirm} 
                secureTextEntry={!showConfirmPass}
                placeholderTextColor={theme.inputPlaceholder}
                borderColor={theme.inputBorder}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                    <ThemedText style={{ color: Colors.primary, fontWeight: '600' }}>
                      {showConfirmPass ? 'Hide' : 'Show'}
                    </ThemedText>
                  </TouchableOpacity>
                }
              />

              <View style={{ marginTop: 32 }}>
                <ThemedButton 
                  title="Save Changes" 
                  onPress={onSave}
                />
              </View>

              {/* Password requirements hint */}
              <View style={{ marginTop: 24, padding: 16, backgroundColor: theme.card, borderRadius: 12 }}>
                <ThemedText style={[s.fieldLabel, { marginBottom: 8 }]}>
                  Password Requirements:
                </ThemedText>
                <ThemedText style={{ fontSize: 12, color: theme.text, opacity: 0.7, marginBottom: 4 }}>
                  • At least 6 characters long
                </ThemedText>
                <ThemedText style={{ fontSize: 12, color: theme.text, opacity: 0.7 }}>
                  • Use a combination of letters, numbers, and symbols
                </ThemedText>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}