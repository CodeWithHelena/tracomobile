import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function AllTasks() {
  const cs = useColorScheme(); const theme = Colors[cs] ?? Colors.light;
  return (
    <View style={{ flex:1, backgroundColor: theme.background, alignItems:'center', justifyContent:'center' }}>
      <Text style={{ color: theme.title, fontSize: 18 }}>All Tasks</Text>
    </View>
  );
}
