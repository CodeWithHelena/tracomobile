import { StyleSheet, Dimensions, Platform} from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  flex1: { flex: 1 },
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  /* Header with top padding */
  header: {
    height: 110, // Increased height for more padding
    paddingHorizontal: 16,
    paddingTop: 50, // Added top padding
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  headerRight: {
    width: 36,
    alignItems: 'flex-end',
  },
  notify: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Card container */
  contentCard: {
    marginTop: 14,
    marginHorizontal: 14,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 14,
    // subtle card shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  

  /* Labels + inputs */
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },

  /* Category grid layout */
  categoryGrid: {
    marginTop: 6,
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  centerRow: {
    justifyContent: 'center',
  },

  /* Date/Time two columns */
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  col: { flex: 1 },

  pickerBox: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  pickerText: {
    fontSize: 14,
    fontWeight: '600',
  },

  /* Notes */
  notesInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 110,
    textAlignVertical: 'top',
    marginBottom: 16,
  },

  /* Save button */
  saveBtn: {
    borderRadius: 16,
    marginTop: 10,
  },

   /* Modal Styles */

  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: Platform.OS === 'ios' ? width * 0.9 : width * 0.8,
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  picker: {
    width: '100%',
    height: Platform.OS === 'ios' ? 200 : 180,
    backgroundColor: 'transparent',
  },
  doneButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Android-specific picker styling
  androidPicker: {
    width: '100%',
    height: 180,
    backgroundColor: 'transparent',
  },
});