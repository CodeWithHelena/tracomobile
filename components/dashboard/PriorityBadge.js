// components/dashboard/PriorityBadge.js
import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/dashboardStyles/viewTask';

export default function PriorityBadge({ level = 'low' }) {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  // Use alert colors defined in Color.js for consistent palette
  const alertPack = Colors[scheme]?.alert ?? Colors.light.alert;

  const lowColor = alertPack?.success?.icon ?? '#10b981';
  const mediumColor = alertPack?.warning?.icon ?? '#f59e0b';
  const highColor = alertPack?.error?.icon ?? '#ef4444';

  const map = {
    low: { label: 'Low', color: lowColor, bg: `${lowColor}22` },
    medium: { label: 'Medium', color: mediumColor, bg: `${mediumColor}22` },
    high: { label: 'High', color: highColor, bg: `${highColor}22` },
  };

  const item = map[level] || map.low;

  return (
    <View
      style={[
        styles.priorityWrap,
        {
          backgroundColor: item.bg,
          borderColor: item.color,
        },
      ]}
    >
      <Text style={[styles.priorityText, { color: item.color }]}>{item.label}</Text>
    </View>
  );
}
