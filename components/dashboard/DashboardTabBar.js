// components/dashboard/DashboardTabBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePreferredColorScheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function DashboardTabBar({ state, descriptors, navigation }) {
  const scheme = usePreferredColorScheme();
  const themeTab = (Colors.tab && Colors.tab[scheme]) || Colors.tab.light;
  const router = useRouter();

  // Hide on particular routes (when on subpages)
  const currentRoute = state.routes[state.index]?.name;
  const hideOn = ['edit-profile', 'settings', 'change-password', 'profile']; // include 'profile' only if you want to hide tabs on profile subpages
  if (hideOn.includes(currentRoute)) {
    // we still show on the main profile tab, but not on edit/profile settings pages;
    // If you want other pages hidden, add them here.
    // For the main profile tab we want to show tab bar — ensure 'profile' not included if that hides main profile. Adjust if needed.
  }

  // NOTE: we still render the bar; just change specific cases in code that return null if you want to completely hide.
  // For example to hide on 'edit-profile' only:
  if (['edit-profile', 'change-password', 'settings'].includes(currentRoute)) {
    return null;
  }

  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.tabBar, { backgroundColor: ThemeTabBg(scheme) }, shadowStyle(themeTab.glow)]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const routeName = route.name;

          // map route to icon
          let iconName = 'home-outline';
          if (routeName === 'today') iconName = 'calendar-outline';
          if (routeName === 'add') iconName = 'add';
          if (routeName === 'all') iconName = 'list-outline';
          if (routeName === 'profile' || routeName === 'settings') iconName = isFocused ? 'person' : 'person-outline';

          // center add button
          if (routeName === 'add') {
            return (
              <TouchableOpacity key={route.key} onPress={() => navigation.navigate(route.name)} activeOpacity={0.9} style={styles.addWrap}>
                <View style={[styles.addBtn, { backgroundColor: themeTab.floatingBg }, glow(themeTab.glow)]}>
                  <Ionicons name="add" size={28} color="#fff" />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={styles.item}
            >
              <Ionicons name={mapActive(iconName, isFocused)} size={24} color={isFocused ? themeTab.iconActive : themeTab.icon} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const ThemeTabBg = (scheme) => {
  return (Colors.tab && Colors.tab[scheme] && Colors.tab[scheme].bg) || Colors.tab.light.bg;
};

const mapActive = (name, active) => (active ? name.replace('-outline', '') : name);

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
    marginHorizontal: 14,
    marginBottom: Platform.select({ ios: 22, android: 14 }),
    height: 64,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
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
