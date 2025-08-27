// components/ThemedButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';

const ThemedButton = ({ title, onPress, style, disabled=false }) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} disabled={disabled} style={[style]}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        start={[0, 0]}
        end={[1, 0]}
        style={[styles.gradient, disabled && { opacity: 0.6 }]}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ThemedButton;
