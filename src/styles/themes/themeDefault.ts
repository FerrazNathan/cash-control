export const defaultTheme = {
  white: '#fff',

  'gray-100': '#E1E1E6',
  'gray-300': '#C4C4CC',
  'gray-400': '#8D8D99',
  'gray-500': '#7C7C8A',
  'gray-600': '#323238',
  'gray-700': '#29292E',
  'gray-800': '#202024',
  'gray-900': '#121214',

  'green-300': '#00B37E',
  'green-500': '#00875F',
  'green-700': '#015F43',

  'red-300': '#F75A68',
  'red-500': '#AB222E',
  'red-700': '#7A1921',
} as const

export const defaultTheme2 = {
  white: '#FFF',
  primary: {
    standard: '#F0F2F5',
    light: '#E1E1E6',
    medium: '#C4C4CC',
  },
  background: {
    standard: '#FEFEFE',
    light: '#E1E1E6',
    medium: '#F0F2F5',
  },
  text: {
    standard: '#121214',
    light: '#E1E1E6',
    medium: '#323238',
  },
  success: {
    standard: '#00B37E',
    light: '#00875F',
    medium: '#015F43',
  },
  error: {
    standard: '#F75A68',
    light: '#AB222E',
    medium: '#7A1921',
  },
  toast: {
    success: '#00875F',
    error: '#AB222E',
  },
  contrast: {
    standard: '#FFFFFF',
    highlight: '#f5ff00',
    dark: '#000000',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
}