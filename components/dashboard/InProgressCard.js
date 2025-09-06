// components/dashboard/InProgressCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from './CircularProgress';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import ThemedText from '../ThemedText'

export default function InProgressCard({
  label = 'Office Project',
  title = 'Grocery shopping app design',
  percent = 60,
  palette = 'blue', // maps to Colors.progress
}) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // chip color
  let groupKey = 'study'; // default
  if (label.toLowerCase().includes('office')) groupKey = 'office';
  else if (label.toLowerCase().includes('personal')) groupKey = 'personal';

  const chipColors = Colors.chips[colorScheme][groupKey];
  const chipBg = chipColors.bg;
  const chipIcon = chipColors.icon;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <View style={styles.row}>
        <View style={[styles.chip, { backgroundColor: chipBg }]}>
          <Ionicons name="briefcase-outline" size={14} color={chipIcon} />
          <Text style={[styles.chipText, { color: chipIcon }]}>{label}</Text>
        </View>
        <ThemedText style={[styles.btnLink, {color: theme.textGlow}]}>View</ThemedText>
      </View>
      <Text style={[styles.title, { color: theme.title }]} numberOfLines={2}>{title}</Text>
      <View style={styles.progressBarWrap}>
        <View style={[styles.progressTrack, { backgroundColor: Colors.progress[palette][colorScheme === 'dark' ? 'trackDark' : 'trackLight'] }]} />
        <View style={[
          styles.progressFill,
          {
            width: `${percent}%`,
            backgroundColor: Colors.progress[palette][colorScheme === 'dark' ? 'fillDark' : 'fillLight']
          }
        ]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    marginRight: 14,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  chipText: { fontSize: 12, fontWeight: '600' },
  title: { marginTop: 12, fontSize: 16, fontWeight: '700' },
  progressBarWrap: { marginTop: 12, height: 8, borderRadius: 6, overflow: 'hidden', position: 'relative' },
  progressTrack: { ...StyleSheet.absoluteFillObject },
  progressFill: { height: 8, borderRadius: 6 },
  btnLink: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
});
