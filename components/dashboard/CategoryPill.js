// components/CategoryPill.js
import React from 'react';
import { Pressable, View, Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function CategoryPill({ label, icon, selected, onPress }) {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  const bg = selected ? Colors.primary : theme.inputBackground;
  const border = selected ? 'transparent' : theme.inputBorder;
  const text = selected ? '#fff' : theme.inputText;
  const iconColor = selected ? '#fff' : theme.iconColor;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 44,
        borderRadius: 12, // same feel as your "View Task" / other pills
        backgroundColor: bg,
        borderWidth: 1,
        borderColor: border,
      }}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: selected ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.05)',
          marginRight: 8,
        }}
      >
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <Text style={{ color: text, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );
}
