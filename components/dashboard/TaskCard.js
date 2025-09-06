import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import s from '../../styles/dashboardStyles/todayTasks';

const categoryMap = {
  office:   { icon: 'business-outline', get colors(){ return this._c; } },
  personal: { icon: 'person-outline',   get colors(){ return this._c; } },
  study:    { icon: 'book-outline',     get colors(){ return this._c; } },
};

// helper to read chip colors by scheme
function getCatColors(catKey, scheme) {
  const pack = Colors.chips[scheme] ?? Colors.chips.light;
  return pack[catKey] || pack.office;
}

export default function TaskCard({
  title,
  subtitle,
  timeLabel,
  category='office', // office | personal | study
  statusKey='todo',  // todo | inProgress | completed
  onView,
}) {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;
  const cat = getCatColors(category, scheme);
  const statusPack = Colors.status[scheme] ?? Colors.status.light;
  const status = statusPack[statusKey] ?? statusPack.todo;

  return (
    <View style={[s.cardWrap]}>
      {/* Timeline stripe + dot (uses category color) */}
      <View style={[s.timeline, { backgroundColor: cat.icon }]} />
      <View style={[s.dot, { backgroundColor: cat.icon }]} />

      {/* Card */}
      <View style={[s.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <View style={s.cardHeader}>
          <Text style={[s.cardTitle, { color: theme.title }]} numberOfLines={1}>{title}</Text>
          <View style={[s.catBadge, { backgroundColor: cat.bg }]}>
            <Ionicons name={category === 'personal' ? 'person-outline'
                               : category === 'study' ? 'book-outline'
                               : 'business-outline'} size={14} color={cat.icon} />
          </View>
        </View>

        {subtitle ? (
          <Text style={[s.cardSub, { color: theme.text }]} numberOfLines={2}>{subtitle}</Text>
        ) : null}

        <View style={s.cardFooter}>
          <View style={s.timeRow}>
            <Ionicons name="time-outline" size={14} color={Colors.primary} />
            <Text style={[s.timeText, { color: theme.text }]}>{timeLabel}</Text>
          </View>

          <View style={[s.statusPill, { backgroundColor: status.bg }]}>
            <Text style={[s.statusText, { color: status.text }]} numberOfLines={1}>
              {statusKey === 'inProgress' ? 'In Progress'
               : statusKey === 'completed' ? 'Done' : 'To-do'}
            </Text>
          </View>

          <TouchableOpacity onPress={onView} style={s.viewBtnMini}>
            <Text style={s.viewBtnMiniText}>View Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
