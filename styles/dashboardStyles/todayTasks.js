import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16 },

  // top bar
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 10,
  },
  topTitle: { fontSize: 20, fontWeight: '700' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },

  // date + calendar button
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  dateLong: { fontSize: 16, fontWeight: '600' },
  dateWeekday: { fontSize: 20, marginTop: 2, fontWeight: '600' },

  viewCalendarBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },

   // date carousel - FIXED DIMENSIONS
  datePill: {
    width: 64, // Fixed width
    height: 80, // Fixed height - increased to accommodate all content
    borderRadius: 16,
    paddingVertical: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
  },
  
  // Optional: If you need different active styling beyond colors
  activeDatePill: {
    // Keep empty or add only visual changes that don't affect layout
    // transform: [{ scale: 1.02 }] // subtle scale effect if desired
  },

  dateTop: { 
    fontSize: 11, 
    opacity: 0.8,
    includeFontPadding: false, // Prevent extra spacing
  },
  dateDay: { 
    fontSize: 18, 
    fontWeight: '800', 
    marginVertical: 2,
    includeFontPadding: false,
  },
  dateBot: { 
    fontSize: 11, 
    opacity: 0.9,
    includeFontPadding: false,
  },

   // Filter row with scroll
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 6,
    height: 40,
  },
  filterScrollContent: {
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    height: 32,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: { 
    fontWeight: '700', 
    fontSize: 12,
    includeFontPadding: false,
  },

  // Date carousel with fixed dimensions
  dateRow: {
    paddingVertical: 6,
    paddingRight: 8,
    height: 90, // Fixed height for the carousel container
  },
  datePill: {
    width: 64,
    height: 80, // Fixed height
    borderRadius: 16,
    paddingVertical: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // list
  listWrap: { paddingBottom: 28 },
  listTitle: { marginTop: 14, marginBottom: 8, fontSize: 16, fontWeight: '700' },

  // task card w/ timeline
  cardWrap: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timeline: {
    width: 4,
    borderRadius: 2,
    marginRight: 8,
    marginLeft: 4,
  },
  dot: {
    position: 'absolute',
    left: 2,
    top: 10,
    width: 10,
    height: 10,
    borderRadius: 6,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: { flex: 1, fontSize: 15, fontWeight: '700' },
  catBadge: {
    width: 26, height: 26, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    marginLeft: 10,
  },
  cardSub: { marginTop: 6, fontSize: 13, lineHeight: 18 },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
    flexWrap: 'wrap',
  },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeText: { fontSize: 12, fontWeight: '600' },

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: { fontSize: 11, fontWeight: '700' },

  viewBtnMini: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(90,62,231,0.12)',
  },
  viewBtnMiniText: { color: '#5A3EE7', fontWeight: '700', fontSize: 11 },



// task card w/ timeline - UPDATED
  cardWrap: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 8, // Add left padding for timeline space
  },
  
  // NEW Timeline container
  timelineContainer: {
    width: 20, // Fixed width for timeline area
    alignItems: 'center',
    marginRight: 8,
  },
  
  // NEW Timeline stripe - vertical line
  timelineStripe: {
    width: 3, // Thinner stripe like in the image
    height: '100%', // Full height of the card
    borderRadius: 1.5, // Rounded ends
    position: 'absolute',
    top: 0,
  },
  
  // NEW Timeline dot - circle at top
  timelineDot: {
    width: 12, // Larger dot like in the image
    height: 12,
    borderRadius: 7, // Perfect circle
    borderWidth: 2,
    borderColor: '#fff', // White border around dot
    marginTop: 0, // Position from top of card
    zIndex: 1, // Ensure dot appears above stripe
  },
  timelineDotWrap: {
 borderRadius: 8, 
  },

  // Card - adjust to account for new timeline layout
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginLeft: 0, // Remove any left margin since timeline is separate
  },



  // calendar modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  calModalBox: {
    width: '100%',
    borderRadius: 16,
    padding: 12,
  },
  calDoneBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  calDoneText: { fontWeight: '700', fontSize: 14 },
});
