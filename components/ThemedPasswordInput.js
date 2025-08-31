import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const ThemedPasswordInput = ({ style, placeholder, value, onChangeText, error = false, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <View style={[
      styles.wrapper,
      error && styles.errorWrapper // Add error border style conditionally
    ]}>
      <TextInput
        style={[styles.input, { color: theme.text }, style]}
        placeholder={placeholder}
        placeholderTextColor={theme.iconColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isVisible}
        {...props}
      />
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={styles.eyeIcon}>
        <Ionicons 
          name={isVisible ? 'eye-off' : 'eye'} 
          size={20} 
          color={theme.iconColor} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: '#ebeeefff',
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorWrapper: {
    borderColor: '#dc3545',
  },
  input: {
    fontSize: 16,
    height: 30,
    flex: 1,
  },
  eyeIcon: {
    padding: 4,
  },
});

export default ThemedPasswordInput;