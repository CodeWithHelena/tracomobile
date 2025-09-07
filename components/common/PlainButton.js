// components/common/PlainButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { usePreferredColorScheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/Colors';

export default function PlainButton({
  title,
  onPress,
  bgColor,
  height = 48,
  width = '100%',
  padding = 12,
  textColor,
  style,
  ...props
}) {
  const scheme = usePreferredColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.button,
        {
          backgroundColor: bgColor || Colors.primary,
          height,
          width,
          padding,
        },
        style,
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: textColor || '#fff' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 16, fontWeight: '700' },
});
