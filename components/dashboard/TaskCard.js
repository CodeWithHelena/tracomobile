// components/dashboard/TaskCard.js
import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import s from '../../styles/dashboardStyles/todayTasks';

const categoryMap = {
  office:   { icon: 'business-outline' },
  personal: { icon: 'person-outline' },
  study:    { icon: 'book-outline' },
};

// helper to read chip colors by scheme
function getCatColors(catKey, scheme) {
  const pack = Colors.chips?.[scheme] ?? Colors.chips?.light;
  if (!pack) return { bg: '#EBEEEF', icon: '#8E8E93' };
  return pack[catKey] || pack.office;
}

export default function TaskCard({
  id,
  title,
  subtitle,
  timeLabel,
  category = 'office',
  statusKey = 'todo',
  onView,
}) {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  const cat = getCatColors(category, scheme);
  const statusPack = Colors.status?.[scheme] ?? Colors.status?.light ?? {};
  const status = statusPack?.[statusKey] ?? statusPack?.todo ?? { bg: '#eee', text: '#333' };

  const taskForNav = { id, title, subtitle, timeLabel, category, statusKey };

  const goToView = () => {
    if (typeof onView === 'function') onView(taskForNav);
    router.push({
      pathname: '/(dashboard)/view-task',
      params: { task: JSON.stringify(taskForNav) }
    });
  };

  return (
    <View style={[s.cardWrap]}>
      {/* NEW Timeline stripe - vertical line */}
      <View style={[s.timelineContainer]}>
        <View style={[s.timelineStripe, { backgroundColor: cat.icon }]} />
        <View style={[s.timelineDotWrap, {borderWidth: 1, borderColor: cat.icon}]}>
          <View style={[s.timelineDot, { backgroundColor: cat.icon }]} />
        </View>
      </View>

      {/* Card - remains unchanged */}
      <View style={[s.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <View style={s.cardHeader}>
          <Text style={[s.cardTitle, { color: theme.title }]} numberOfLines={1}>{title}</Text>
          <View style={[s.catBadge, { backgroundColor: cat.bg }]}>
            <Ionicons
              name={category === 'personal' ? 'person-outline' : category === 'study' ? 'book-outline' : 'business-outline'}
              size={14}
              color={cat.icon}
            />
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

          <TouchableOpacity onPress={goToView} style={s.viewBtnMini}>
            <Text style={s.viewBtnMiniText}>View Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}