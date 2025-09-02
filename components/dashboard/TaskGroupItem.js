// components/dashboard/TaskGroupItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from './CircularProgress';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';

export default function TaskGroupItem({
  icon = 'briefcase-outline',
  title = 'Office Project',
  subtitle = '23 Tasks',
  percent = 70,
  palette = 'pink', // 'purple' | 'blue' | 'orange' | 'pink'
  chipKey = 'office', // office | personal | study
}) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const chip = Colors.chips[chipKey];
  const chipBg = colorScheme === 'dark' ? chip.dark : chip.light;
  const chipIcon = chip.icon;

  return (
    <View style={[styles.row, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <View style={[styles.iconWrap, { backgroundColor: chipBg }]}>
        <Ionicons name={icon} size={20} color={chipIcon} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.title }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>{subtitle}</Text>
      </View>

      <CircularProgress size={40} strokeWidth={5} percent={percent} palette={palette} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderRadius: 16, borderWidth: 1, marginBottom: 12,
  },
  iconWrap: {
    width: 42, height: 42, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  title: { fontSize: 15, fontWeight: '700' },
  subtitle: { fontSize: 12, marginTop: 2 },
});
