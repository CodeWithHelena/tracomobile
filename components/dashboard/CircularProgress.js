import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function CircularProgress({
  size = 60,
  strokeWidth = 8,
  percent = 75,
  palette = 'purple', // 'purple' | 'blue' | 'orange' | 'pink'
  textColor = null,
  trackColor = null,   // NEW: Custom track color (circle itself)
  fillColor = null,    // NEW: Custom fill color (progress ring)
}) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const p = Colors.progress[palette];
  
  // Use custom colors if provided, otherwise use palette colors
  const finalTrackColor = trackColor || (colorScheme === 'dark' ? p.trackDark : p.trackLight);
  const finalFillColor = fillColor || (colorScheme === 'dark' ? p.fillDark : p.fillLight);
  const finalTextColor = textColor || (colorScheme === 'dark' ? theme.text : theme.title);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percent / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* SVG Progress Ring */}
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background circle (the circle itself) - will be purple */}
        <Circle
          stroke={finalTrackColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress ring (the moving part) - will be white */}
        <Circle
          stroke={finalFillColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      
      {/* Percentage Text in Center */}
      <View style={styles.textContainer}>
        <Text style={[
          styles.percentageText, 
          { 
            color: finalTextColor,
            fontSize: size * 0.22,
          }
        ]}>
          {percent}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  percentageText: {
    fontWeight: '700',
    includeFontPadding: false,
    textAlign: 'center',
  },
});