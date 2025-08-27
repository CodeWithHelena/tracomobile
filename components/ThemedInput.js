// components/ThemedInput.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

const ThemedInput = ({ style, placeholder, value, onChangeText, keyboardType='default', ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View style={styles.wrapper }>
      <TextInput
        style={[styles.input, { color: theme.text } , style]}
        placeholder={placeholder}
        placeholderTextColor={theme.iconColor}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: '#ebeeefff'
  },
  input: {
    fontSize: 16,
     height: 30,
  },
});

export default ThemedInput;
