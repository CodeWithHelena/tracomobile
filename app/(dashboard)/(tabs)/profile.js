// app/(dashboard)/profile.js
import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { usePreferredColorScheme } from '../../../contexts/ThemeContext';
import ProfileAvatar from '../../../components/dashboard/ProfileAvatar';
import ThemedText from '../../../components/ThemedText';
import s from '../../../styles/dashboardStyles/profile';

export default function Profile() {
  const router = useRouter();
  const scheme = usePreferredColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={[s.menuItem]} onPress={onPress}>
      <View style={[s.menuLeft]}>
        <Ionicons name={icon} size={20} color={Colors.primary} style={{ marginRight: 12 }} />
        <ThemedText style={s.menuText}>{title}</ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.iconColor} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
        {/* Top left title only */}
        <View style={s.topLeft}>
          <ThemedText title style={[s.profileTitle, { color: theme.title }]}>Profile</ThemedText>
        </View>

        {/* Avatar + name */}
        <View style={s.headerCard}>
          <ProfileAvatar size={64} />
          <View style={{ marginLeft: 12 }}>
            <ThemedText title style={{ fontSize: 18 }}>Johan Hjort</ThemedText>
            <ThemedText style={{ marginTop: 4 }}>Product Designer</ThemedText>
          </View>
        </View>

        {/* Quick Actions (card) */}
        <View style={s.card}>
          <MenuItem 
            icon="person" 
            title="Edit Profile" 
            onPress={() => router.push('/edit-profile')} 
          />
          <View style={s.divider} />
          <MenuItem icon="wallet-outline" title="Upgrade to Pro" onPress={() => {}} />
          <View style={s.divider} />
          <MenuItem icon="reload-outline" title="Restore Purchase" onPress={() => {}} />
        </View>

        

        {/* Main menu */}
        <View style={s.card}>
          <MenuItem 
            icon="bookmark-outline" 
            title="My favourites" 
            onPress={() => router.push('/my-favourites')} 
          />
          <View style={s.divider} />
          <MenuItem icon="time-outline" title="My history" onPress={() => {}} />
          <View style={s.divider} />
          <MenuItem icon="person-circle-outline" title="Edit profile" onPress={() => router.push('/(dashboard)/edit-profile')} />
          <View style={s.divider} />
          <MenuItem 
            icon="settings-outline" 
            title="Settings" 
            onPress={() => router.push('/settings')} 
          />
          <View style={s.divider} />
          <MenuItem icon="log-out-outline" title="Logout" onPress={() => {
            // call your logout from AuthContext
            // e.g. signOut() from useAuth()
          }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
