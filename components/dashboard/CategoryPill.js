import React from 'react';
import { Pressable, View, Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function CategoryPill({ 
  label, 
  icon, 
  selected, 
  onPress, 
  chipKey = 'default'
}) {
  const scheme = useColorScheme();
  
  // Get the chip colors based on chipKey and color scheme for UNSELECTED state
  const chipColors = Colors.chips[scheme]?.[chipKey] || Colors.chips.light.default;
  
  // Get theme colors
  const theme = Colors[scheme] ?? Colors.light;

  // Colors for SELECTED state (keep your original styling)
  const selectedBg = Colors.primary; // Purple background
  const selectedText = '#fff'; // White text
  const selectedIcon = '#fff'; // White icon
  const selectedBorder = 'transparent'; // No border when selected

  // Colors for UNSELECTED state - use chip colors for icon only
  const unselectedBg = theme.inputBackground;
  const unselectedText = theme.inputText;
  const unselectedIcon = chipColors.icon; // Use the chip's icon color from Colors.js
  const unselectedBorder = theme.inputBorder;

  // Apply colors based on selection state
  const bg = selected ? selectedBg : unselectedBg;
  const textColor = selected ? selectedText : unselectedText;
  const iconColor = selected ? selectedIcon : unselectedIcon; // This is the key fix!
  const borderColor = selected ? selectedBorder : unselectedBorder;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 12, 
        backgroundColor: bg,
        borderWidth: 1,
        borderColor: borderColor,
        marginVertical: 6,
        alignSelf: 'flex-start',
        minHeight: 44,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: selected ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.05)',
          marginRight: 10,
          flexShrink: 0,
        }}
      >
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <Text 
        style={{ 
          color: textColor, 
          fontWeight: '700', 
          fontSize: 14,
          flexShrink: 1,
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </Pressable>
  );
}