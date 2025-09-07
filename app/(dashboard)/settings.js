// app/(dashboard)/settings.js
import React, { useState } from 'react';
import { SafeAreaView, View, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { usePreferredColorScheme, useTheme } from '../../contexts/ThemeContext';
import ThemedText from '../../components/ThemedText';
import s from '../../styles/dashboardStyles/profile';
import ThemedButton from '../../components/ThemedButton';

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

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: theme.background }]}>
      <View style={s.container}>
        {/* No top icon — subpages have center header handled in parent */}
        <View style={s.card}>
          <View style={s.rowBetween}>
            <ThemedText style={s.menuText}>Notifications</ThemedText>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>

          <View style={s.divider} />

          <View style={s.rowBetween}>
            <ThemedText style={s.menuText}>Dark Mode</ThemedText>
            <Switch value={dark} onValueChange={onToggleDark} />
          </View>

          <View style={s.divider} />

          <TouchableOpacity onPress={() => router.push('/(dashboard)/change-password')} style={s.menuItem}>
            <ThemedText style={s.menuText}>Change password</ThemedText>
          </TouchableOpacity>

          <View style={s.divider} />
          <TouchableOpacity onPress={() => alert('Clear cache (stub)')} style={s.menuItem}>
            <ThemedText style={s.menuText}>Clear cache</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
