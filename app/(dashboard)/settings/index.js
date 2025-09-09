import React, { useState } from 'react';
import { View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';
import { usePreferredColorScheme, useTheme } from '../../../contexts/ThemeContext';
import ThemedText from '../../../components/ThemedText';
import PageHeader from '../../../components/dashboard/PageHeader';
import s from '../../../styles/dashboardStyles/profile';

export default function Settings() {
  const router = useRouter();
  const scheme = usePreferredColorScheme();
  const { toggle } = useTheme();
  const theme = Colors[scheme] ?? Colors.light;

  const [notifications, setNotifications] = useState(true);
  const [dark, setDark] = useState(scheme === 'dark');

  const onToggleDark = () => {
    setDark(d => !d);
    toggle();
  };

  const MenuItem = ({ icon, title, onPress, showArrow = false, rightComponent }) => (
    <TouchableOpacity style={s.menuItem} onPress={onPress} disabled={!onPress}>
      <View style={s.menuLeft}>
        <Ionicons name={icon} size={20} color={Colors.primary} style={{ marginRight: 12 }} />
        <ThemedText style={s.menuText}>{title}</ThemedText>
      </View>
      {rightComponent || (showArrow && <Ionicons name="chevron-forward" size={18} color={theme.iconColor} />)}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <PageHeader title="Settings" />
      
      <ScrollView 
        contentContainerStyle={[s.content, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[s.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          {/* Notifications - with switch */}
          <View style={s.rowBetween}>
            <View style={s.menuLeft}>
              <Ionicons name="notifications-outline" size={18} color={Colors.primary} style={{ marginRight: 12 }} />
              <ThemedText style={s.menuText}>Notifications</ThemedText>
            </View>
            <Switch 
              value={notifications} 
              onValueChange={setNotifications}
              thumbColor={notifications ? Colors.primary : theme.uiBackground}
              trackColor={{ false: theme.inputBorder, true: Colors.primary + '80' }}
            />
          </View>

          <View style={[s.divider, { backgroundColor: theme.cardBorder }]} />

          {/* Dark Mode - with switch */}
          <View style={s.rowBetween}>
            <View style={s.menuLeft}>
              <Ionicons name="moon-outline" size={18} color={Colors.primary} style={{ marginRight: 12 }} />
              <ThemedText style={s.menuText}>Dark Mode</ThemedText>
            </View>
            <Switch 
              value={dark} 
              onValueChange={onToggleDark}
              thumbColor={dark ? Colors.primary : theme.uiBackground}
              trackColor={{ false: theme.inputBorder, true: Colors.primary + '80' }}
            />
          </View>

          <View style={[s.divider, { backgroundColor: theme.cardBorder }]} />

          {/* Change Password - with forward arrow */}
          <MenuItem
            icon="lock-closed-outline"
            title="Change Password"
            onPress={() => router.push('/settings/change-password')}
            showArrow={true}
          />

          <View style={[s.divider, { backgroundColor: theme.cardBorder }]} />
          
          {/* Clear Cache - with forward arrow */}
          <MenuItem
            icon="trash-outline"
            title="Clear Cache"
            onPress={() => alert('Clear cache (stub)')}
            showArrow={true}
          />

          <View style={[s.divider, { backgroundColor: theme.cardBorder }]} />
          
          {/* Privacy Policy - with forward arrow */}
          <MenuItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            onPress={() => alert('Privacy policy (stub)')}
            showArrow={true}
          />

          <View style={[s.divider, { backgroundColor: theme.cardBorder }]} />
          
          {/* Terms of Service - with forward arrow */}
          <MenuItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={() => alert('Terms of service (stub)')}
            showArrow={true}
          />

          <View style={[s.divider, { backgroundColor: theme.cardBorder }]} />
          
          {/* Help & Support - with forward arrow */}
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => alert('Help & support (stub)')}
            showArrow={true}
          />

          <View style={[s.divider, { backgroundColor: theme.cardBorder }]} />
          
          {/* About - with forward arrow */}
          <MenuItem
            icon="information-circle-outline"
            title="About"
            onPress={() => alert('About (stub)')}
            showArrow={true}
          />
        </View>

        {/* App version info */}
        <View style={[s.card, { 
          marginTop: 16, 
          alignItems: 'center', 
          backgroundColor: theme.card, 
          borderColor: theme.cardBorder 
        }]}>
          <View style={s.menuLeft}>
            <Ionicons name="phone-portrait-outline" size={18} color={Colors.primary} style={{ marginRight: 12 }} />
            <ThemedText style={[s.menuText, { color: theme.text, opacity: 0.7 }]}>
              App Version 1.0.0
            </ThemedText>
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
}