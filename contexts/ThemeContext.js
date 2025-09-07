// contexts/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // default to system
  const system = Appearance.getColorScheme() || 'light';
  const [scheme, setScheme] = useState(system);

  useEffect(() => {
    // listen to system changes and respect them only if user hasn't chosen override
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      // if user hasn't toggled manually, keep in sync with system
      // We choose to keep override permanent once user toggles; if you prefer otherwise remove this guard.
      // For now, don't override user explicit choice, so do nothing here.
    });
    return () => sub?.remove();
  }, []);

  const toggle = () => setScheme(s => (s === 'light' ? 'dark' : 'light'));
  const setTheme = (val) => setScheme(val === 'dark' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ scheme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * usePreferredColorScheme() -> returns the active scheme ('light'|'dark')
 * Use this instead of useColorScheme from 'react-native' inside your screens/components
 * when you want to respect the app-level toggle.
 */
export function usePreferredColorScheme() {
  const { scheme } = useContext(ThemeContext);
  return scheme || (Appearance.getColorScheme() || 'light');
}
