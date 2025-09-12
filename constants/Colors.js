// constants/Colors.js
export const Colors = {
  // gradient used across header / buttons
  gradientStart: '#4f3be3', // deep purple
  gradientEnd: '#b565ff',   // soft magenta

  primary: '#5A3EE7',
  warning: '#cc475a',

  // the UI theme objects used by Themed components (use useColorScheme())
  dark: {
    text: '#d4d4d4',
    title: '#ffffff',
    background: '#252231',
    navBackground: '#201e2b',
    iconColor: '#9591a5',
    iconColorFocused: '#fff',
    uiBackground: '#2f2b3d',
    inputBackground: '#3a3546',
    inputBorder: '#4a4556',
    inputText: '#ffffff',
    inputPlaceholder: '#9591a5',
    card: '#2f2b3d',
    cardBorder: '#3a3546',
    textGlow: 'rgba(24, 7, 91, 0.35)',
    // Alert Colors for Dark Mode
    alert: {
      success: {
        bg: '#1a3a2f',
        icon: '#34d399',
        text: '#a7f3d0'
      },
      error: {
        bg: '#3a1a1a',
        icon: '#f87171',
        text: '#fecaca'
      },
      warning: {
        bg: '#3a2f1a',
        icon: '#fbbf24',
        text: '#fef3c7'
      },
      info: {
        bg: '#1a2e3a',
        icon: '#60a5fa',
        text: '#dbeafe'
      }
    }
  },
  light: {
    text: '#625f72',
    title: '#201e2b',
    background: '#f5f3fb',
    navBackground: '#efeefe',
    iconColor: '#686477',
    iconColorFocused: '#201e2b',
    uiBackground: '#ffffff',
    inputBackground: '#ebeeef',
    inputBorder: '#d1d5db',
    inputText: '#201e2b',
    inputPlaceholder: '#9ca3af',
    card: '#ffffff',
    cardBorder: '#e5e7eb',
    textGlow: 'rgba(30, 16, 84, 0.35)',
    // Alert Colors for Light Mode
    alert: {
      success: {
        bg: '#d4f8e8',
        icon: '#10b981',
        text: '#065f46'
      },
      error: {
        bg: '#fee2e2',
        icon: '#ef4444',
        text: '#991b1b'
      },
      warning: {
        bg: '#fef3c7',
        icon: '#f59e0b',
        text: '#92400e'
      },
      info: {
        bg: '#dbeafe',
        icon: '#3b82f6',
        text: '#1e40af'
      }
    }
  },

  // ----- NEW shared brand accents -----
  accentPurple: '#7A5AF8',
  accentPurpleDark: '#5E46C3',

  // Tab bar + glow
  tab: {
    light: {
      bg: '#ffffff',
      tabBg: '#EEE9FF',
      border: '#ecebf6',
      icon: '#b2a0faff',
      iconActive: '#5E46C3',
      glow: 'rgba(122, 90, 248, 0.35)',
      floatingBg: '#7A5AF8',
    },
    dark: {
      bg: '#201e2b',
      border: '#3a3546',
      icon: '#9a97a8',
      iconActive: '#ffffff',
      glow: 'rgba(122, 90, 248, 0.45)',
      floatingBg: '#5E46C3',
    },
  },

  // Cards & chips used on Home
  /*
  chips: {
    office: { light: '#FFE3EC', dark: '#4A2D36', icon: '#FF5E99' },
    personal: { light: '#E4ECFF', dark: '#2F3550', icon: '#5B8DFF' },
    study: { light: '#FFF2DF', dark: '#4B3A22', icon: '#FFA726' },
    health: { light: '#FFE4E4', dark: '#4A2D2D', icon: '#FF5252' }, // Added health chip
    default: { light: '#EBEEEF', dark: '#2C2C2E', icon: '#8E8E93' } // Added default chip
  }, */

  // Progress rings (track + fill)
  progress: {
    purple: { trackLight: '#EDE8FF', fillLight: '#7A5AF8', trackDark: '#3A3550', fillDark: '#B09CFF' },
    blue:   { trackLight: '#E6EEFF', fillLight: '#4F7DFF', trackDark: '#303A57', fillDark: '#8FB0FF' },
    orange: { trackLight: '#FFEBD8', fillLight: '#FF9B43', trackDark: '#4A3726', fillDark: '#FFB874' },
    pink:   { trackLight: '#F5E9FF', fillLight: '#5A3EE7', trackDark: '#4A2D36', fillDark: '#FF8CB7' },
  },

  backdrop: {
    light: {
      tabBar: 'rgba(245, 246, 250, 0.85)', // Semi-transparent version of your light background
      border: 'rgba(236, 235, 246, 0.6)',
    },
    dark: {
      tabBar: 'rgba(32, 30, 43, 0.85)', // Semi-transparent version of your dark navBackground
      border: 'rgba(58, 53, 70, 0.6)',
    }
  },

  // Date and Time picker colors
  picker: {
    light: {
      background: '#ffffff',
      text: '#000000',
      accent: '#5A3EE7',
    },
    dark: {
      background: '#2a2730',
      text: '#ffffff', 
      accent: '#b565ff',
    }
  },

  // Add chip/icon colors for task groups (light + dark)
  chips: {
    light: {
      office:  { bg: '#F5E9FF', icon: '#5A3EE7' }, // purple family
      personal:{ bg: '#E9F3FF', icon: '#3B82F6' }, // blue family
      study:   { bg: '#FFF1E5', icon: '#F59E0B' }, // orange family
      health:  { bg: '#FFE4E4', icon: '#FF5252' }, // red family for health
      default: { bg: '#EBEEEF', icon: '#8E8E93' }  // default fallback
    },
    dark: {
      office:  { bg: '#3a2f54', icon: '#bfa8ff' },
      personal:{ bg: '#25364a', icon: '#9AC2FF' },
      study:   { bg: '#4a3b2a', icon: '#FFB357' },
      health:  { bg: '#4a2d2d', icon: '#FF8A8A' }, // red family for health
      default: { bg: '#2C2C2E', icon: '#8E8E93' }  // default fallback
    }
  },

  // Status pill colors
  status: {
    light: {
      all:        { bg: '#EEEAFB', text: '#4f3be3' },
      todo:       { bg: '#E9F3FF', text: '#3B82F6' },
      inProgress: { bg: '#FFF6E5', text: '#D97706' },
      completed:  { bg: '#E8FAF0', text: '#059669' },
    },
    dark: {
      all:        { bg: '#2e2940', text: '#cfc7ff' },
      todo:       { bg: '#1f2b3a', text: '#9AC2FF' },
      inProgress: { bg: '#3e3421', text: '#FFB357' },
      completed:  { bg: '#1f3a2d', text: '#34d399' },
    }
  },

  // Calendar theming (used by react-native-calendars)
  calendar: {
    light: {
      bg: '#ffffff',
      text: '#201e2b',
      today: '#5A3EE7',
      selected: '#5A3EE7',
      month: '#625f72',
      disabled: '#c4c4c4',
    },
    dark: {
      bg: '#2f2b3d',
      text: '#d4d4d4',
      today: '#bfa8ff',
      selected: '#bfa8ff',
      month: '#9591a5',
      disabled: '#6b6b6b',
    }
  },

  // Tab bar background (used by custom tab bar you built)
  tabbar: {
    light: '#efeefe',
    dark: '#201e2b',
  },

};