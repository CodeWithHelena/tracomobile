import React, { useMemo, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  Platform,
  StatusBar,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

import ThemedText from '../../../components/ThemedText';
import ThemedButton from '../../../components/ThemedButton';

import CalendarModal from '../../../components/CalendarModal';
import DateCarousel from '../../../components/dashboard/DateCarousel';
import FilterTabs from '../../../components/dashboard/FilterTabs';
import TaskCard from '../../../components/dashboard/TaskCard';
import PlainButton from '../../../components/PlainButton';

import s from '../../../styles/dashboardStyles/todayTasks';

export default function TodayScreen() {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  // header date text
  const niceDate = useMemo(() => {
    const d = selectedDate;
    const long = d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    const weekday = d.toLocaleDateString(undefined, { weekday: 'long' });
    return { long, weekday };
  }, [selectedDate]);

  // sample tasks
  const tasks = [
    { id:'1', title:'Market Research', subtitle:'Grocery shopping app design', time:'10:00 AM', category:'office',   status:'completed' },
    { id:'2', title:'Competitive Analysis', subtitle:'Grocery shopping app design', time:'12:00 PM', category:'personal', status:'inProgress' },
    { id:'3', title:'Create Low-fidelity Wireframe', subtitle:'Uber Eats redesign challenge', time:'07:00 PM', category:'study', status:'todo' },
    { id:'4', title:'How to pitch a Design Sprint', subtitle:'About design sprint', time:'09:30 PM', category:'study', status:'todo' },
    { id:'5', title:'Sprint Planning', subtitle:'Office mobile revamp', time:'11:00 AM', category:'office', status:'inProgress' },
  ];

  const filtered = tasks.filter(t => filter === 'all' ? true : (
    filter === 'todo' ? t.status === 'todo' :
    filter === 'inProgress' ? t.status === 'inProgress' :
    t.status === 'completed'
  ));

  const onSelectCalendarDate = (dateStr) => {
    // dateStr: "YYYY-MM-DD"
    const [y, m, d] = dateStr.split('-').map(n => parseInt(n, 10));
    setSelectedDate(new Date(y, m - 1, d));
  };
  
    return (
      <SafeAreaView style={[s.safe, { backgroundColor: theme.background, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0 }]}>
        <View style={[s.container, { backgroundColor: theme.background }]}>

          {/* Top Row: "All Task" + search */}
          <View style={s.topRow}>
            <ThemedText title style={[s.topTitle, { color: theme.title }]}>All Task</ThemedText>
            <TouchableOpacity style={[s.iconBtn, { backgroundColor: theme.uiBackground }]}>
              <Ionicons name="search-outline" size={18} color={theme.iconColor} />
            </TouchableOpacity>
          </View>

          {/* Date summary + View Calendar btn */}
          <View style={s.dateBar}>
            <View style={{ flex: 1 }}>
              <Text style={[s.dateLong, { color: theme.title }]}>
                {niceDate.long}
              </Text>
              <Text style={[s.dateWeekday, { color: theme.title, fontWeight: '700' }]}>
                {niceDate.weekday}
              </Text>
            </View>
            <PlainButton 
              title="View Calendar" 
              onPress={() => setCalendarOpen(true)} 
              paddingHorizontal={12}
              paddingVertical={8}
            />
          </View>

          {/* Horizontal dates - FIXED HEIGHT CONTAINER */}
          <View style={{ height: 100, marginTop:10 }}>
            <DateCarousel
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
            />
          </View>

          {/* Filter chips - FIXED HEIGHT CONTAINER */}
          <View style={{ height: 50 }}>
            <FilterTabs value={filter} onChange={setFilter} />
          </View>

          {/* Task list */}
          <ScrollView
            contentContainerStyle={s.listWrap}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[s.listTitle, { color: theme.title }]}>Task List</Text>

            {filtered.map(t => (
              <TaskCard
                key={t.id}
                title={t.title}
                subtitle={t.subtitle}
                timeLabel={t.time}
                category={t.category}
                statusKey={t.status}
                onView={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        {/* Calendar Modal */}
        <CalendarModal
          visible={calendarOpen}
          onClose={() => setCalendarOpen(false)}
          selectedDate={selectedDate}
          onSelectDate={onSelectCalendarDate}
        />
      </SafeAreaView>
    );
}



const styles = StyleSheet.create({
  dateItem: {
    height: 60, // fixed height
    width: 50,  // fixed width (adjust as needed)
    borderRadius: 12,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED', // default
  },
  activeDate: {
    backgroundColor: Colors.light.primary, // or theme.primary
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeDateText: {
    color: '#fff',
    fontWeight: '700',
  },
});
