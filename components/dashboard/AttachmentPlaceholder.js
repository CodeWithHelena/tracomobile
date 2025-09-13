// components/dashboard/AttachmentPlaceholder.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePreferredColorScheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/Colors';
import s from '../../styles/dashboardStyles/viewTask';

export default function AttachmentPlaceholder({ uri = null, title = 'Attachment' }) {
  const scheme = usePreferredColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  return (
    <View style={[s.attachment, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      {uri ? (
        <Image source={{ uri }} style={s.attachmentImage} />
      ) : (
        <View style={s.attachmentEmpty}>
          <Ionicons name="document-outline" size={28} color={Colors.primary} />
        </View>
      )}
      <Text style={[s.attachmentTitle, { color: theme.title }]} numberOfLines={1}>{title}</Text>
    </View>
  );
}
