import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    blue: {
      500: '#364D9D',
      300: '#647AC7',
    },
    gray: {
      700: '#1A181B',
      600: '#3E3A40',
      500: '#5F5B62',
      400: '#9F9BA1',
      300: '#D9D8DA',
      200: '#EDECEE',
      100: '#F7F7F8',
    },
    white: '#FFFFFF',
    red: {
      300: '#EE7979',
    },
  },
  fonts: {
    bold: 'Karla_700Bold',
    regular: 'Karla_400Regular',
    light: 'Karla_300Light',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    11: 45,
    14: 56,
    33: 148,
  },
});