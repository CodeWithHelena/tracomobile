import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform, 
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Text,
  useColorScheme,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import ThemedText from '../../../components/ThemedText';
import ThemedInput from '../../../components/ThemedInput';
import ThemedButton from '../../../components/ThemedButton';
import CategoryPill from '../../../components/dashboard/CategoryPill';
import PageHeader from '../../../components/dashboard/PageHeader';

import { Colors } from '../../../constants/Colors';
import s from '../../../styles/dashboardStyles/addTask';



export default function AddTask() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const pickerTheme = Colors.picker[colorScheme] ?? Colors.picker.light;

  // form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');

  // pickers visibility
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

const panResponder = useCallback(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dx > 50 && Math.abs(gestureState.dy) < Math.abs(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 100) {
        router.back();
      }
    },
  }),
  []
);
  /*
  const onChangeDate = (_, selected) => {
    setShowDate(false);
    if (selected) setDate(selected);
  };

  const onChangeTime = (_, selected) => {
    setShowTime(false);
    if (selected) setTime(selected);
  };

  */

   const onChangeDate = (_, selected) => {
    if (Platform.OS === "android") {
      setShowDate(false);
      if (selected) setDate(selected);
    } else {
      if (selected) setDate(selected); // don’t close on iOS scroll
    }
  };

  const onChangeTime = (_, selected) => {
    if (Platform.OS === "android") {
      setShowTime(false);
      if (selected) setTime(selected);
    } else {
      if (selected) setTime(selected);
    }
  };

  const save = () => {
    router.back();
  };
  
  const [selectedCategory, setSelectedCategory] = useState('work');

  return (
    <KeyboardAvoidingView style={[s.flex1, { backgroundColor: theme.background }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[s.container, { backgroundColor: theme.card }]} {...panResponder.panHandlers}>
          <PageHeader title="Add New Task" />

          {/* Content */}
          <ScrollView contentContainerStyle={s.scrollContent}>
            <View style={[s.contentCard, { backgroundColor: theme.card }]}>
              {/* Task Title */}
              <ThemedText style={[s.label, { color: theme.title }]}>Task Title</ThemedText>
              <ThemedInput
                placeholder="Add title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={theme.inputPlaceholder}
                borderColor={theme.inputBorder}
                returnKeyType="done"
              />

              {/* Category - Fixed layout */}
              <ThemedText style={[s.label, { color: theme.title, marginTop: 14 }]}>Category</ThemedText>

            {/* In your category grid section */}
            <View style={s.categoryGrid}>
              <View style={s.categoryRow}>
                <CategoryPill
                  label="Office Project"
                  icon="business-outline"
                  selected={category === 'office'}
                  onPress={() => setCategory('office')}
                  chipKey="office"
                />
                <CategoryPill
                  label="Daily Study"
                  icon="book-outline"
                  selected={category === 'study'}
                  onPress={() => setCategory('study')}
                  chipKey="study"
                />                  
              </View>
              <View style={[s.categoryRow, s.centerRow]}>
                <CategoryPill
                  label="Health"
                  icon="fitness-outline"
                  selected={category === 'health'}
                  onPress={() => setCategory('health')}
                  chipKey="health"
                />
                <CategoryPill
                  label="Personal Project"
                  icon="person-outline"
                  selected={category === 'personal'}
                  onPress={() => setCategory('personal')}
                  chipKey="personal"
                />
              </View>
            </View>

              {/* When: Date & Time */}
              <View style={s.row}>
                <View style={s.col}>
                  <ThemedText style={[s.label, { color: theme.title }]}>Due date</ThemedText>
                  <Pressable
                    onPress={() => setShowDate(true)}
                    style={[s.pickerBox, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}
                  >
                    <Text style={[s.pickerText, { color: theme.inputText }]}>
                      {date.toLocaleDateString()}
                    </Text>
                    <Ionicons name="calendar-outline" size={18} color={theme.iconColor} />
                  </Pressable>
                </View>

                <View style={s.col}>
                  <ThemedText style={[s.label, { color: theme.title }]}>Time</ThemedText>
                  <Pressable
                    onPress={() => setShowTime(true)}
                    style={[s.pickerBox, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }]}
                  >
                    <Text style={[s.pickerText, { color: theme.inputText }]}>
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <Ionicons name="time-outline" size={18} color={theme.iconColor} />
                  </Pressable>
                </View>
              </View>

              {/* Notes */}
              <ThemedText style={[s.label, { color: theme.title }]}>Description</ThemedText>
              <ThemedInput
                placeholder="Add your notes here"
                value={notes}
                onChangeText={setNotes}
                multiline
                borderColor={theme.inputBorder}
                style={{height: 110}}
                placeholderTextColor={theme.inputPlaceholder}
              />

              {/* Save Button */}
              <ThemedButton title="Save" onPress={save} style={s.saveBtn} />
            </View>
          </ScrollView>

         {/* Date Picker Modal */}
          <Modal
            visible={showDate}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDate(false)}
          >
            <TouchableOpacity 
              style={s.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowDate(false)}
            >
              <View style={[s.modalContent, { backgroundColor: pickerTheme.background }]}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChangeDate}
                  style={s.picker}
                  themeVariant={colorScheme}
                  textColor={pickerTheme.text}
                  accentColor={pickerTheme.accent}
                />
                {Platform.OS === 'ios' && (
                  <TouchableOpacity 
                    style={s.doneButton}
                    onPress={() => setShowDate(false)}
                  >
                    <Text style={[s.doneButtonText, { color: pickerTheme.accent }]}>
                      Done
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Time Picker Modal */}
          <Modal
            visible={showTime}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowTime(false)}
          >
            <TouchableOpacity 
              style={s.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowTime(false)}
            >
              <View style={[s.modalContent, { backgroundColor: pickerTheme.background }]}>
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChangeTime}
                  style={s.picker}
                  themeVariant={colorScheme}
                  textColor={pickerTheme.text}
                  accentColor={pickerTheme.accent}
                />
                {Platform.OS === 'ios' && (
                  <TouchableOpacity 
                    style={s.doneButton}
                    onPress={() => setShowTime(false)}
                  >
                    <Text style={[s.doneButtonText, { color: pickerTheme.accent }]}>
                      Done
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}