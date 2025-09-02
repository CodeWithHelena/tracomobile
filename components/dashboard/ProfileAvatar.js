// components/dashboard/ProfileAvatar.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function ProfileAvatar({ size = 42, uri }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View style={[
      styles.wrap,
      { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.inputBackground, borderColor: theme.cardBorder }
    ]}>
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
      ) : (
        <Ionicons name="person" size={size * 0.6} color={theme.iconColor} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
