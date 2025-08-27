// components/ThemedPasswordInput.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const ThemedPasswordInput = ({ value, onChangeText, placeholder, style, ...props }) => {
  const [visible, setVisible] = useState(false);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View style={[styles.wrapper, {  borderColor: 'rgba(0,0,0,0.04)' }]}>
      <TextInput
        style={[styles.input, { color: theme.text }, style]}
        placeholder={placeholder}
        placeholderTextColor={theme.iconColor}
        secureTextEntry={!visible}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      <Pressable onPress={() => setVisible(v => !v)} style={styles.icon}>
        <Ionicons name={visible ? 'eye' : 'eye-off'} size={20} color={theme.iconColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebeeefff'
,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 35,
  },
  icon: {
    marginLeft: 8,
    padding: 6,
  },
});

export default ThemedPasswordInput;
