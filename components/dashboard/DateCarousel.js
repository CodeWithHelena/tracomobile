import React, { useMemo } from 'react';
import { FlatList, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import s from '../../styles/dashboardStyles/todayTasks';

export default function DateCarousel({ selectedDate, onSelect }) {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  const days = useMemo(() => {
    const list = [];
    const start = new Date();
    start.setDate(start.getDate() - 2);
    for (let i = 0; i < 20; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      list.push(d);
    }
    return list;
  }, []);

  const key = (d) => d.toDateString();
  const isSame = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <FlatList
      data={days}
      keyExtractor={key}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.dateRow}
      renderItem={({ item }) => {
        const active = isSame(item, selectedDate);
        return (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={[
              s.datePill, 
              active && s.activeDatePill, // Use separate style for active state
              { 
                backgroundColor: active ? Colors.primary : theme.uiBackground,
                borderColor: active ? Colors.primary : theme.inputBorder,
                borderWidth: 1,
              }
            ]}
          >
            <Text style={[s.dateTop, { color: active ? '#fff' : theme.text }]}>
              {item.toLocaleString(undefined, { month: 'short' })}
            </Text>
            <Text style={[s.dateDay, { color: active ? '#fff' : theme.title }]}>
              {item.getDate()}
            </Text>
            <Text style={[s.dateBot, { color: active ? '#fff' : theme.text }]}>
              {item.toLocaleString(undefined, { weekday: 'short' })}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}