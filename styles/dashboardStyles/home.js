// styles/dashboardStyles/home.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 120 },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 16 
  },
  hello: { 
    fontSize: 13, 
    fontWeight: '600', 
    opacity: 0.8 
  },
  name: { fontSize: 20, fontWeight: '800', marginTop: 2 },
  notify: {
    width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },

  bigCard: {
    marginTop: 16, marginHorizontal: 20,
    borderRadius: 20, padding: 16,
  },
  bigRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6},
  bigTitle: { fontSize: 14, fontWeight: '700', opacity: 0.9 },
  bigBtn: {
    marginTop: 16, alignSelf: 'flex-start',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12,
  },

  sectionTitle: { marginTop: 22, marginBottom: 10, paddingHorizontal: 20, fontSize: 18, fontWeight: '800' },

  slider: { paddingLeft: 20, marginTop: 6 },
  groupsWrap: { paddingHorizontal: 20, marginTop: 10, marginBottom: 24 },
});
