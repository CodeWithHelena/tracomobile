import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

const ThemedInput = ({
  style,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  error = false,
  height, // New prop for custom height
  width, // New prop for custom width
  borderWidth, // New prop for border width
  borderColor, // New prop for border color
  borderRadius, // New prop for border radius
  borderStyle, // New prop for border style (solid, dashed, dotted)
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // Create dynamic styles based on props
  const dynamicWrapperStyles = {
    height: height ? height : undefined,
    width: width ? width : undefined,
    borderWidth: borderWidth !== undefined ? borderWidth : 1,
    borderColor: borderColor ? borderColor : (error ? '#dc3545' : 'transparent'),
    borderRadius: borderRadius !== undefined ? borderRadius : 14,
    borderStyle: borderStyle ? borderStyle : 'solid'
  };

  const dynamicInputStyles = {
    height: height ? height - 24 : 30, // Adjust input height based on wrapper height
  };

  return (
    <View style={[
      styles.wrapper,
      dynamicWrapperStyles,
      error && styles.errorWrapper
    ]}>
      <TextInput
        style={[
          styles.input, 
          dynamicInputStyles,
          { color: theme.text }, 
          style
        ]}
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
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: '#ebeeefff',
  },
  errorWrapper: {
    borderColor: '#dc3545', // Red border for errors
  },
  input: {
    fontSize: 16,
  },
});

export default ThemedInput;