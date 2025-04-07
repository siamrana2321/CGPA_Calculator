export const THEME = {
  colors: {
    primary: '#6200ee',
    primaryDark: '#3700b3',
    primaryLight: '#bb86fc',
    secondary: '#03dac6',
    background: '#ffffff',
    surface: '#ffffff',
    error: '#b00020',
    text: '#121212',
    textLight: '#757575',
    textMedium: '#424242',
    border: '#e0e0e0',
    inputBg: '#f9f9f9',
    highlight: '#ede7f6',
    success: '#4caf50',
    warning: '#ff9800',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  radius: {
    s: 4,
    m: 8,
    l: 16,
    round: 1000,
  },
  typography: {
    title: {
      fontSize: 24,
      fontWeight: 'bold' as const,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold' as const,
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
    },
    small: {
      fontSize: 12,
    },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
}; 