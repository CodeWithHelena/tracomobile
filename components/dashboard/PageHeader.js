import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../ThemedText';
import { Colors } from '../../constants/Colors';

export default function PageHeader({ title, showBackButton = true, rightComponent }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Hide status bar when this header is shown */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <View style={styles.headerLeft}>
          {showBackButton && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <ThemedText title style={styles.headerTitle}>{title}</ThemedText>

        <View style={styles.headerRight}>
          {rightComponent || <View style={{ width: 36 }} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: Colors.primary,
  },
  header: {
    height: 110,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // Adjust for iOS notch
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: 36,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  headerRight: {
    width: 36,
    alignItems: 'flex-end',
  },
});