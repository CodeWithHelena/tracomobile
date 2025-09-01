import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from './ThemedText';

const ThemedAlert = ({ 
  type = 'success', 
  message, 
  visible, 
  onDismiss, 
  duration = 4000 
}) => {
  React.useEffect(() => {
    if (visible && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  if (!visible || !message) return null;

  const alertConfig = {
    success: {
      bgColor: '#d4f8e8',
      iconColor: '#10b981',
      iconName: 'checkmark-circle',
      textColor: '#065f46'
    },
    error: {
      bgColor: '#fee2e2',
      iconColor: '#ef4444',
      iconName: 'close-circle',
      textColor: '#991b1b'
    },
    warning: {
      bgColor: '#fef3c7',
      iconColor: '#f59e0b',
      iconName: 'warning',
      textColor: '#92400e'
    },
    info: {
      bgColor: '#dbeafe',
      iconColor: '#3b82f6',
      iconName: 'information-circle',
      textColor: '#1e40af'
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
        {/* Icon with white circle background - takes full height */}
        <View style={[styles.iconWrapper, { backgroundColor: config.iconColor }]}>
          <View style={styles.iconBackground}>
            <Ionicons 
              name={config.iconName} 
              size={18} 
              color={config.iconColor} 
            />
          </View>
        </View>
        
        {/* Message */}
        <View style={styles.textContainer}>
          <ThemedText style={[styles.message, { color: config.textColor }]}>
            {message}
          </ThemedText>
        </View>
      </View>
      
      {/* Close button */}
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
    alignItems: 'stretch', // Changed to stretch to allow full height
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
    minHeight: 60, // Ensure minimum height for proper styling
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
    justifyContent: 'center', // Center close button vertically
  },
});

export default ThemedAlert;