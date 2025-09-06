import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  useColorScheme, 
  ScrollView,
  Platform 
} from 'react-native';
import { Colors } from '../../constants/Colors';
import s from '../../styles/dashboardStyles/todayTasks';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'todo', label: 'To do' },
  { key: 'inProgress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
];

export default function FilterTabs({ value, onChange }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // Define colors for both active and inactive states
  const getFilterColors = (filterKey, isActive) => {
    const palette = Colors.status[colorScheme] ?? Colors.status.light;
    const col = palette[filterKey];
    
    if (isActive) {
      return {
        bg: col.bg,
        text: col.text,
        border: col.bg
      };
    } else {
      return {
        bg: 'transparent',
        text: theme.text,
        border: theme.inputBorder
      };
    }
  };

  return (
    <View style={[s.filterRow, { height: 40 }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterScrollContent}
        keyboardShouldPersistTaps="always"
      >
        {FILTERS.map(f => {
          const active = value === f.key;
          const colors = getFilterColors(f.key, active);

          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => onChange(f.key)}
              style={[
                s.filterChip,
                { 
                  backgroundColor: colors.bg,
                  borderColor: colors.border,
                  height: 32,
                  minWidth: 80,
                  marginRight: 8, // Add spacing between chips
                }
              ]}
            >
              <Text 
                style={[
                  s.filterText, 
                  { 
                    color: colors.text,
                  }
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}