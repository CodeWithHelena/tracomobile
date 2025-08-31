import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';

const InlineMessage = ({ 
  type = 'error', 
  message, 
  visible 
}) => {
  if (!visible || !message) return null;

  const messageConfig = {
    error: {
      color: '#dc3545',
    },
    warning: {
      color: '#ffc107',
    },
    info: {
      color: '#17a2b8',
    },
    success: {
      color: '#28a745',
    }
  };

  const config = messageConfig[type] || messageConfig.error;

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.message, { color: config.color }]}>
        {message}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 8,
    paddingLeft: 16, // Add left padding here
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default InlineMessage;