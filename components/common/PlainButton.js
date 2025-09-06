import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, // ← ADD THIS IMPORT
  ActivityIndicator 
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import ThemedText from './ThemedText';

const PlainButton = ({
  title,
  onPress,
  backgroundColor = null,
  textColor = null,
  height = 50,
  width = null,
  paddingHorizontal = 20,
  paddingVertical = 12,
  borderRadius = 12,
  loading = false,
  disabled = false,
  style = {},
  textStyle = {},
  children,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // Use custom colors or fallback to theme colors
  const bgColor = backgroundColor || Colors.primary;
  const txtColor = textColor || '#FFFFFF'; // White text on primary background

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          height,
          width,
          paddingHorizontal,
          paddingVertical,
          borderRadius,
          opacity: disabled ? 0.6 : 1,
        },
        style
      ]}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={txtColor} />
      ) : (
        children || (
          <ThemedText
            style={[
              styles.text,
              {
                color: txtColor,
              },
              textStyle
            ]}
          >
            {title}
          </ThemedText>
        )
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PlainButton;