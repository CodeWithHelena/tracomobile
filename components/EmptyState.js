// components/EmptyState.js
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePreferredColorScheme } from '../contexts/ThemeContext';
import { Colors } from '../constants/Colors';
import s from '../styles/dashboardStyles/viewTask';

export default function EmptyState({ icon = 'information-circle-outline', title = 'Nothing here', subtitle = '', width = 160, height = 96 }) {
  const scheme = usePreferredColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  return (
    <View style={[s.emptyWrap, { width, height, backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}>
      <View style={s.emptyIcon}>
        <Ionicons name={icon} size={28} color={Colors.primary} />
      </View>
      <Text style={[s.emptyTitle, { color: theme.title }]}>{title}</Text>
      {subtitle ? <Text style={[s.emptySub, { color: theme.text }]}>{subtitle}</Text> : null}
    </View>
  );
}
