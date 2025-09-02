import { Colors } from '../constants/Colors';

// Return style objects directly, not StyleSheet.create()
export const getAuthStyles = (colorScheme) => {
  const theme = Colors[colorScheme] ?? Colors.light;
  
  return {
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      height: 270,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40
    },
    brand: {
      fontSize: 34,
      color: '#fff',
      fontWeight: '700'
    },
    btnLinkWrapper: {
      position: 'absolute',
      right: 18,
      top: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnLink: {
      color: '#fff',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    btnLinkText: {
      color: '#c5bfbfff',
      fontSize: 16,
      marginRight: 8,
    },
    card: {
      flex: 1,
      backgroundColor: theme.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      paddingTop: 45,
      marginTop: -32,
    },
    formTextTitle: {
      fontSize: 30,
      fontWeight: '700',
      textAlign: 'center',
      color: theme.title
    },
    formTextSubTitle: {
      marginTop: 10,
      marginBottom: 16,
      fontSize: 17,
      fontWeight: '500',
      textAlign: 'center',
      color: theme.iconColor
    },
  };
};