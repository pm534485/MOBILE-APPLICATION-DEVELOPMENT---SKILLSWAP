export const theme = {
  colors: {
    primary: '#215CDC',
    primaryDark: '#18448A',
    secondary: '#10A37F',
    background: '#F4F6FA',
    card: '#FFFFFF',
    border: '#E4E7EE',
    text: '#18212B',
    mutedText: '#6D768A',
    success: '#16A34A',
    error: '#D62D2D',
    warning: '#D97706',
    chip: '#E8EEFD',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 22,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
  },
  typography: {
    h1: {
      fontSize: 26,
      fontWeight: '800' as const,
      color: '#18212B',
    },
    h2: {
      fontSize: 18,
      fontWeight: '700' as const,
      color: '#18212B',
    },
    body: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: '#18212B',
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: '400' as const,
      color: '#6D768A',
    },
    button: {
      fontSize: 15,
      fontWeight: '700' as const,
      color: '#FFFFFF',
    },
  },
  shadow: {
    card: {
      shadowColor: '#18212B',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    modal: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
  },
};

export type Theme = typeof theme;
export default theme;
