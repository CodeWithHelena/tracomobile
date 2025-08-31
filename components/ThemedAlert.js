import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ThemedText from './ThemedText';
import { useColorScheme } from 'react-native';

const ThemedAlert = ({ 
  type = 'success', 
  message, 
  visible, 
  onDismiss, 
  duration = 4000 
}) => {
  console.log("ThemedAlert props:", { visible, message, type });

  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (visible && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  if (!visible || !message) return null;

  const alertConfig = {
    success: {
      bgColor: '#d4edda',
      borderColor: '#c3e6cb',
      textColor: '#155724',
      icon: '✅'
    },
    error: {
      bgColor: '#f8d7da',
      borderColor: '#f5c6cb',
      textColor: '#721c24',
      icon: '❌'
    },
    warning: {
      bgColor: '#fff3cd',
      borderColor: '#ffeaa7',
      textColor: '#856404',
      icon: '⚠️'
    }
  };

  const config = alertConfig[type] || alertConfig.success;

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: config.bgColor,
        borderColor: config.borderColor
      }
    ]}>
      <View style={styles.content}>
        <ThemedText style={[styles.icon, { color: config.textColor }]}>
          {config.icon}
        </ThemedText>
        <ThemedText style={[styles.message, { color: config.textColor }]}>
          {message}
        </ThemedText>
      </View>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
          <ThemedText style={[styles.closeText, { color: config.textColor }]}>
            ✕
          </ThemedText>
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
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
    marginLeft: 12,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ThemedAlert;