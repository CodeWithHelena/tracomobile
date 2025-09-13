// app/(dashboard)/view-task.js
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '../../components/dashboard/PageHeader';
import ThemedText from '../../components/ThemedText';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import s from '../../styles/dashboardStyles/viewTask';
import AttachmentPlaceholder from '../../components/dashboard/AttachmentPlaceholder';
import EmptyState from '../../components/EmptyState';
import PriorityBadge from '../../components/dashboard/PriorityBadge'; // <<-- import

// helper to read chip colors by scheme (same as TaskCard)
function getCatColors(catKey, scheme) {
  const pack = Colors.chips?.[scheme] ?? (Colors.chips?.light || {});
  if (!pack) return { bg: '#EBEEEF', icon: '#8E8E93' };
  return pack[catKey] || pack.office;
}

export default function ViewTask() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const lastTaskParamRef = useRef(null);

  useEffect(() => {
    const taskParam = params?.task;
    const idParam = params?.id;

    const safeSetTask = (newTask) => {
      if (task && task.id === newTask.id && task.title === newTask.title) {
        setLoading(false);
        return;
      }
      setTask(newTask);
      setLoading(false);
    };

    // parse passed task (string)
    if (taskParam) {
      if (lastTaskParamRef.current === taskParam) {
        setLoading(false);
        return;
      }

      try {
        const parsed = typeof taskParam === 'string' ? JSON.parse(taskParam) : taskParam;
        lastTaskParamRef.current = taskParam;

        safeSetTask({
          id: parsed.id,
          title: parsed.title,
          subtitle: parsed.subtitle,
          description: parsed.description || parsed.subtitle || '',
          category: parsed.category || 'office',
          statusKey: parsed.statusKey || parsed.status || 'todo',
          time: parsed.timeLabel || parsed.time || '—',
          dueDate: parsed.dueDate ? new Date(parsed.dueDate) : parsed.due ? new Date(parsed.due) : new Date(),
          priority: parsed.priority || 'low',
          recurring: parsed.recurring || null,
          recurringRange: parsed.recurringRange || null,
          attachments: parsed.attachments || [],
        });
        return;
      } catch (e) {
        console.warn('ViewTask: failed to parse params.task', e);
      }
    }

    // id param fallback (placeholder - replace with Appwrite fetch later)
    if (idParam) {
      if (task && task.id === idParam) {
        setLoading(false);
        return;
      }
      const dummy = {
        id: idParam,
        title: 'Loaded Task (by id)',
        subtitle: 'Short summary from card',
        description: 'Full description fetched using id... (replace with Appwrite fetch).',
        category: 'office',
        statusKey: 'inProgress',
        time: '10:00 AM',
        dueDate: new Date(),
        priority: 'medium',
        recurring: 'None',
        recurringRange: null,
        attachments: [],
      };
      safeSetTask(dummy);
      return;
    }

    // final sample fallback
    const sample = {
      id: 'sample-1',
      title: 'Moodboard for mobile application',
      subtitle: 'Short summary shown in card',
      description:
        "Low-fidelity wireframes are simple, early-stage representations of a website or app's layout and user flow. They are typically created using basic shapes and lines to indicate position and hierarchy of elements on a page.",
      category: 'office',
      statusKey: 'inProgress',
      time: '11:00 AM',
      dueDate: new Date(2025, 8, 5),
      priority: 'low',
      recurring: 'Weekly',
      recurringRange: 'Mon - Fri',
      attachments: [],
    };

    if (!task || task.id !== sample.id) {
      safeSetTask(sample);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.task, params?.id]);

  if (loading || !task) {
    return (
      <SafeAreaView style={[s.safe, { backgroundColor: theme.background }]}>
        <PageHeader title="View Task" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ThemedText>Loading...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const cat = getCatColors(task.category, scheme);
  const statusPack = Colors.status?.[scheme] ?? Colors.status?.light ?? {};
  const status = statusPack?.[task.statusKey] ?? statusPack.todo ?? { bg: '#eee', text: '#333' };

  return (
    <View style={[s.safe, { backgroundColor: theme.card }]}>
      <PageHeader title="View Task" />

      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
        

        {/* Info block: label + value side-by-side with small gap */}
        <View style={[s.infoBlock, { backgroundColor: theme.card }]}>
          {/* Title */}
        <ThemedText title style={s.taskTitle}>{task.title}</ThemedText>
          {/* Status */}
          <View style={s.infoRow}>
            <ThemedText style={s.infoLabel}>Status</ThemedText>
            <View style={s.infoValueWrap}>
              <View style={[s.statusWrap, { backgroundColor: status.bg }]}>
                <ThemedText style={[s.statusText, { color: status.text }]}>
                  {task.statusKey === 'inProgress' ? 'In Progress'
                    : task.statusKey === 'completed' ? 'Completed'
                    : task.statusKey === 'todo' ? 'To-do'
                    : task.statusKey}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Task Group — icon has background, text has NO background */}
          <View style={s.infoRow}>
            <ThemedText style={s.infoLabel}>Task Group</ThemedText>
            <View style={s.infoValueWrap}>
              <View style={s.groupRow}>
                <View style={[s.groupIconWrap, { backgroundColor: cat.bg }]}>
                  <Ionicons
                    name={task.category === 'personal' ? 'person-outline' : task.category === 'study' ? 'book-outline' : 'business-outline'}
                    size={16}
                    color={cat.icon}
                  />
                </View>
                <ThemedText style={s.groupText}>
                  {task.category === 'office' ? 'Office Project' : task.category === 'personal' ? 'Personal Project' : 'Daily Study'}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Due Date */}
          <View style={s.infoRow}>
            <ThemedText style={s.infoLabel}>Due Date</ThemedText>
            <View style={s.infoValueWrap}>
              <View style={s.inline}>
                <View style={[s.smallIconWrap, { backgroundColor: theme.inputBackground }]}>
                  <Ionicons name="calendar-outline" size={16} color={Colors.primary} />
                </View>
                <ThemedText style={s.infoValue}>
                  {task.dueDate ? task.dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Time */}
          <View style={s.infoRow}>
            <ThemedText style={s.infoLabel}>Time</ThemedText>
            <View style={s.infoValueWrap}>
              <View style={s.inline}>
                <View style={[s.smallIconWrap, { backgroundColor: theme.inputBackground }]}>
                  <Ionicons name="time-outline" size={16} color={Colors.primary} />
                </View>
                <ThemedText style={s.infoValue}>{task.time ?? '—'}</ThemedText>
              </View>
            </View>
          </View>

          {/* Priority — use PriorityBadge component */}
          <View style={s.infoRow}>
            <ThemedText style={s.infoLabel}>Priority</ThemedText>
            <View style={s.infoValueWrap}>
              <PriorityBadge level={task.priority} />
            </View>
          </View>

          {/* Recurring */}
          <View style={s.infoRow}>
            <ThemedText style={s.infoLabel}>Recurring</ThemedText>
            <View style={s.infoValueWrap}>
              <ThemedText style={s.infoValue}>
                {task.recurring || 'None'}{task.recurringRange ? ' ' : ''}
                {task.recurringRange ? `(${task.recurringRange})` : ''}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={s.section}>
          <ThemedText style={s.sectionTitle}>Description</ThemedText>
          <ThemedText style={s.descriptionText}>{task.description}</ThemedText>
        </View>

        {/* Attachments */}
        <View style={s.section}>
          <ThemedText style={s.sectionTitle}>Attachments</ThemedText>
          {task.attachments?.length ? (
            <View style={s.attachmentsWrap}>
              {task.attachments.map((att, i) => (
                <AttachmentPlaceholder key={i} uri={att.uri} title={att.title} />
              ))}
            </View>
          ) : (
            <EmptyState icon="document-outline" title="No attachments" subtitle="No files attached." width={160} height={110} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
