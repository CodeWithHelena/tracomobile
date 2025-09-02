import React from 'react';
import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'; // Fixed import
import { Ionicons } from '@expo/vector-icons'; // Only Ionicons from vector-icons
import ThemedText from './ThemedText';
import { Colors } from '../constants/Colors';

const ThemedAlert = ({ 
  type = 'success', 
  message, 
  visible, 
  onDismiss, 
  duration = 4000 
}) => {
  const colorScheme = useColorScheme(); // Now this will work
  const theme = Colors[colorScheme] ?? Colors.light;

  React.useEffect(() => {
    if (visible && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  if (!visible || !message) return null;

  const alertConfig = {
    success: {
      bgColor: theme.alert.success.bg,
      iconColor: theme.alert.success.icon,
      iconName: 'checkmark-circle',
      textColor: theme.alert.success.text
    },
    error: {
      bgColor: theme.alert.error.bg,
      iconColor: theme.alert.error.icon,
      iconName: 'close-circle',
      textColor: theme.alert.error.text
    },
    warning: {
      bgColor: theme.alert.warning.bg,
      iconColor: theme.alert.warning.icon,
      iconName: 'warning',
      textColor: theme.alert.warning.text
    },
    info: {
      bgColor: theme.alert.info.bg,
      iconColor: theme.alert.info.icon,
      iconName: 'information-circle',
      textColor: theme.alert.info.text
    }
  };

  const config = alertConfig[type] || alertConfig.success;

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: config.bgColor,
      }
    ]}>
      <View style={styles.content}>
        <View style={[styles.iconWrapper, { backgroundColor: config.iconColor }]}>
          <View style={styles.iconBackground}>
            <Ionicons 
              name={config.iconName} 
              size={18} 
              color={config.iconColor} 
            />
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <ThemedText style={[styles.message, { color: config.textColor }]}>
            {message}
          </ThemedText>
        </View>
      </View>
      
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
          <Ionicons 
            name="close" 
            size={18} 
            color={config.textColor}
            style={{ opacity: 0.7 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
    minHeight: 60,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch', 
  },
  iconWrapper: {
    width: 45,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBackground: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  closeButton: {
    padding: 2,
    marginLeft: 8,
    justifyContent: 'center',
  },
});

export default ThemedAlert;