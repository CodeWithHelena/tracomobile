// components/dashboard/CategoryPill.js
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
  const theme = Colors[scheme] ?? Colors.light;
  
  // Safely get chip colors based on chipKey
  const chip = Colors.chips[chipKey] || Colors.chips.default;
  const chipIcon = chip?.icon || theme.iconColor;

  const bg = selected ? Colors.primary : theme.inputBackground;
  const border = selected ? 'transparent' : theme.inputBorder;
  const text = selected ? '#fff' : theme.inputText;
  
  // Use chip icon color instead of theme iconColor
  const iconColor = selected ? '#fff' : chipIcon;

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
        borderColor: border,
        marginVertical: 6, // Changed from 4 to 6 to match container negative margin
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
          flexShrink: 0, // Prevent icon from shrinking
        }}
      >
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <Text 
        style={{ 
          color: text, 
          fontWeight: '700', 
          fontSize: 14,
          flexShrink: 1, // Allow text to shrink if needed
          flexWrap: 'nowrap', // Prevent text from wrapping
        }}
        numberOfLines={1} // Ensure single line
        ellipsizeMode="tail" // Add "..." if text is too long
      >
        {label}
      </Text>
    </Pressable>
  );
}