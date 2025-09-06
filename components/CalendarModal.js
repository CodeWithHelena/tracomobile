import React from 'react';
import { Modal, View, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors } from '../constants/Colors';
import s from '../styles/dashboardStyles/todayTasks';

export default function CalendarModal({
  visible,
  onClose,
  selectedDate,          // JS Date
  onSelectDate,          // (dateStr) => void
}) {
  const scheme = useColorScheme();
  const palette = Colors.calendar[scheme] ?? Colors.calendar.light;

  const marked = selectedDate
    ? { [formatDateKey(selectedDate)]: { selected: true, selectedColor: palette.selected } }
    : {};

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity activeOpacity={1} style={s.modalOverlay} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={[s.calModalBox, { backgroundColor: palette.bg }]}>
          <Calendar
            onDayPress={(d) => onSelectDate(d.dateString)}
            markedDates={marked}
            theme={{
              calendarBackground: palette.bg,
              monthTextColor: palette.month,
              dayTextColor: palette.text,
              textSectionTitleColor: palette.text,
              todayTextColor: palette.today,
              arrowColor: palette.today,
              textDisabledColor: palette.disabled,
            }}
            enableSwipeMonths
          />
          <TouchableOpacity style={s.calDoneBtn} onPress={onClose}>
            <Text style={[s.calDoneText, { color: Colors.primary }]}>Done</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

function formatDateKey(date) {
  // 'YYYY-MM-DD'
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}
