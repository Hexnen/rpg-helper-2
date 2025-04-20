import { createTheme, ThemeOptions } from '@mui/material/styles';

// Create base theme options with shared properties
const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '1rem',
      fontWeight: 600,
    },
    button: {
      fontFamily: 'Montserrat, sans-serif',
      textTransform: 'none' as const,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
};

// Create dark theme
export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#7E57C2', // Deep purple - main accent
      light: '#B085F5',
      dark: '#5E35B1',
    },
    secondary: {
      main: '#26A69A', // Turquoise - secondary accent
      light: '#64D8CB',
      dark: '#00766C',
    },
    error: {
      main: '#FF5252',
    },
    warning: {
      main: '#FFB300', // Amber - for alerts
    },
    info: {
      main: '#29B6F6',
    },
    success: {
      main: '#66BB6A',
    },
    background: {
      default: '#1A1E2E', // Dark navy
      paper: '#1D2235', // Slightly lighter navy
    },
    text: {
      primary: '#E0E0E0', // Light gray for text
      secondary: '#9E9E9E', // Medium gray for secondary text
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#141824', // Darker than background for contrast
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1E2E',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(29, 34, 53, 0.8)',
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(126, 87, 194, 0.15)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(126, 87, 194, 0.25)',
          },
        },
      },
    },
  },
});

// Create light theme
export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#6A3CB5', // Deeper purple for better contrast
      light: '#9E75D7',
      dark: '#4A2A80',
    },
    secondary: {
      main: '#00897B', // Deeper teal for better contrast
      light: '#4EBAAA',
      dark: '#005B50',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#F57C00',
    },
    info: {
      main: '#0288D1',
    },
    success: {
      main: '#388E3C',
    },
    background: {
      default: '#F8F9FA', // Light gray
      paper: '#FFFFFF', // White
    },
    text: {
      primary: '#1A1E2E', // Dark navy
      secondary: '#5A5A5A', // Medium gray
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F0F0F0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1A1E2E',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(106, 60, 181, 0.08)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(106, 60, 181, 0.15)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#6A3CB5',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#6A3CB5',
        },
      },
    },
  },
});

// For backward compatibility
export default darkTheme; 