import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useColorScheme, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/dashboardStyles/home';
import ProfileAvatar from '../../components/dashboard/ProfileAvatar';
import InProgressCard from '../../components/dashboard/InProgressCard';
import CircularProgress from '../../components/dashboard/CircularProgress';

export default function Home() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // --- auto slider for "In Progress" ---
  const listRef = useRef(null);
  const data = [
    { id: '1', label: 'Office Project', title: 'Grocery shopping app design', percent: 62, palette: 'blue' },
    { id: '2', label: 'Personal Project', title: 'Uber Eats redesign challenge', percent: 38, palette: 'orange' },
    { id: '3', label: 'Daily Study', title: 'React Native animations practice', percent: 85, palette: 'purple' },
  ];
  

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scroll} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <ProfileAvatar size={44} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.hello, { color: theme.text }]}>Hello!</Text>
            <Text style={[styles.name, { color: theme.title }]}>Livia Vaccaro</Text>
          </View>
          <View style={[styles.notify, { backgroundColor: theme.uiBackground }]}>
            <Ionicons 
              name="notifications" 
              size={20} 
              color={theme.title} // ✅ match "Livia Vaccaro" text color
            />
          </View>
        </View>

        {/* Big progress card (purple) */}
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          style={styles.bigCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.bigRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={[styles.bigTitle, { color: '#fff' }]}>
                Your today's task almost done!
              </Text>
              <TouchableOpacity 
                style={[styles.bigBtn, { backgroundColor: 'rgba(255,255,255,0.18)' }]}
              >
                <Text style={{ color: '#fff', fontWeight: '700' }}>View Task</Text>
              </TouchableOpacity>
            </View>
            

            <View style={{ flexDirection: "row", alignItems: "center", gap: 20}}>
              {/* Progress Ring with purple circle and white ring */}
              <CircularProgress
                size={80} // Custom size - larger for the big card
                strokeWidth={7}
                percent={80}
                trackColor="#7A5AF8" // Purple circle (using your accentPurple)
                fillColor="#efebebff"   // White progress ring

                textColor="#FFFFFF"   // White text
              />

              {/* 3 Dots - Updated to use theme colors */}
              <TouchableOpacity style={{
                backgroundColor: theme.uiBackground,
                borderRadius: 5,
                paddingLeft: 5,
                paddingRight: 5,
                alignSelf: "flex-start",
              }}>
                <Feather name="more-horizontal" size={20} color={theme.title} />
              </TouchableOpacity>
            </View>


          </View>
        </LinearGradient>

        {/* In Progress slider */}
        <Text style={[styles.sectionTitle, { color: theme.title }]}>In Progress</Text>
        <FlatList
          ref={listRef}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InProgressCard
              label={item.label}
              title={item.title}
              percent={item.percent}
              palette={item.palette}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slider}
          pagingEnabled={false}
        />

        {/* Task Groups */}
        <Text style={[styles.sectionTitle, { color: theme.title }]}>Task Groups</Text>
        <View style={styles.groupsWrap}>
          <TaskGroup
            icon="business-outline"
            title="Office Project"
            subtitle="23 Tasks"
            percent={70}
            palette="pink"
            chipKey="office"
          />
          <TaskGroup
            icon="person-outline"
            title="Personal Project"
            subtitle="30 Tasks"
            percent={52}
            palette="blue"
            chipKey="personal"
          />
          <TaskGroup
            icon="book-outline"
            title="Daily Study"
            subtitle="30 Tasks"
            percent={87}
            palette="orange"
            chipKey="study"
          />
          <TaskGroup
            icon="book-outline"
            title="Daily Study"
            subtitle="30 Tasks"
            percent={87}
            palette="orange"
            chipKey="study"
          />
          <TaskGroup
            icon="book-outline"
            title="Daily Study"
            subtitle="30 Tasks"
            percent={87}
            palette="orange"
            chipKey="study"
          />
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
);

}

// small wrapper to keep imports tidy
function TaskGroup(props) {
  const TaskGroupItem = require('../../components/dashboard/TaskGroupItem').default;
  return <TaskGroupItem {...props} />;
}
