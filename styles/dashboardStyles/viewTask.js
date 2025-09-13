// styles/dashboardStyles/viewTask.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: { flex: 1 },
  container: {  paddingBottom: 32 },

  taskTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },

  infoBlock: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 18,
    borderRadius: 14,
    // subtle card shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  // --- rows: label + value side-by-side (small gap) ---
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 30,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginRight: 12,       // small gap between label and value
    minWidth: 90,         // keep labels aligned — adjust if needed
  },
  infoValueWrap: {
    flex: 1,
    alignItems: 'flex-start', // value sits to the right of label, but not forced to far edge
  },

  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '700',
  },

  // group: icon only has background, text has no background
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  groupText: {
    fontSize: 15,
    fontWeight: '700',
  },

  // not flexed sections
  section: {
    marginTop: 10,
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },

  // attachments
  attachmentsWrap: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  attachment: {
    width: 120,
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  attachmentImage: {
    width: 104,
    height: 64,
    borderRadius: 8,
    marginBottom: 8,
  },
  attachmentEmpty: {
    width: 104,
    height: 64,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  // empty state
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
  },
  emptyIcon: { marginBottom: 8 },
  emptyTitle: { fontSize: 14, fontWeight: '700' },
  emptySub: { fontSize: 12, marginTop: 6, textAlign: 'center' },

  // Priority / Status small components
  priorityWrap: { alignSelf: 'flex-start', paddingHorizontal: 25, paddingVertical: 6, borderRadius: 12, borderWidth: 1 },
  priorityText: { fontWeight: '700', fontSize: 13 },

  statusWrap: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: { fontWeight: '700', fontSize: 13 },
});
