// components/dashboard/DashboardTabBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function DashboardTabBar({ state, descriptors, navigation }) {
  const colorScheme = useColorScheme();
  const themeTab = colorScheme === 'dark' ? Colors.tab.dark : Colors.tab.light;

  // Hide tab bar on Add Task screen
  const current = state.routes[state.index]?.name;
  if (current === 'add') {
    return null;
  }

  return (
    <View style={[styles.wrapper]}>
      <View style={[
        styles.tabBar,
        { backgroundColor: themeTab.tabBg, borderColor: themeTab.border },
        shadowStyle(themeTab.glow)
      ]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          // icons per route
          let icon = 'home-outline';
          if (route.name === 'today') icon = 'calendar-outline';
          if (route.name === 'all') icon = 'list-outline';
          if (route.name === 'profile') icon = 'person-outline';

          // Center "add" tab is special
          if (route.name === 'add') {
            return (
              <TouchableOpacity key={route.key} onPress={onPress} activeOpacity={0.9} style={styles.addWrap}>
                <View style={[
                  styles.addBtn,
                  {
                    backgroundColor: themeTab.floatingBg
                  },
                  glow(themeTab.glow)
                ]}>
                  <Ionicons name="add" size={28} color="#fff" />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity key={route.key} accessibilityRole="button" onPress={onPress} style={styles.item}>
              <Ionicons
                name={mapActive(icon, isFocused)}
                size={24}
                color={isFocused ? themeTab.iconActive : themeTab.icon}
                style={isFocused ? glow(themeTab.glow) : undefined}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const mapActive = (name, active) => {
  if (!active) return name;
  // turn outline -> filled when active
  return name.replace('-outline', '');
};

const glow = (glowColor) => ({
  shadowColor: glowColor,
  shadowOpacity: 0.9,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 6 },
  elevation: 10,
});

const shadowStyle = (shadowColor) => ({
  shadowColor,
  shadowOpacity: 0.15,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 },
  elevation: 6,
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
  },
  tabBar: {
    marginHorizontal: 0,
    paddingBottom: Platform.select({ ios: 30, android: 30 }),
    height: 80,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#F5F6FA",
  },
  item: { flex: 1, alignItems: 'center' },
  addWrap: {
    width: 72, alignItems: 'center', top: -26,
  },
  addBtn: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center',
  },
});