'use client';

import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { darkTheme, lightTheme } from '@/theme';
import { EmotionCache } from './EmotionCache';
import dynamic from 'next/dynamic';

// Create theme context
type ThemeMode = 'light' | 'dark' | 'system';
interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  systemTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create color mode context for backward compatibility
interface ColorModeContextType {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

// Hook to use theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeRegistry');
  }
  return context;
};

// Dynamic import of ThemeToggle to reduce initial bundle size
const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
  loading: () => null,
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // Check if browser prefers dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<ThemeMode>('system');
  const [mounted, setMounted] = useState(false);

  // Load saved theme preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode, mounted]);

  // Determine which theme to use based on user preference and system settings
  const systemTheme = prefersDarkMode ? 'dark' : 'light' as 'light' | 'dark';
  const activeTheme = mode === 'system' ? systemTheme : mode;
  
  // Create the theme object based on current mode
  const theme = useMemo(() => {
    return activeTheme === 'dark' ? darkTheme : lightTheme;
  }, [activeTheme]);

  // Context value
  const themeContextValue = useMemo(() => ({
    mode,
    setMode,
    systemTheme
  }), [mode, systemTheme]);

  // Color mode context value for toggle function
  const colorModeValue = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => {
        if (prevMode === 'light') return 'dark';
        if (prevMode === 'dark') return 'light';
        // If system, toggle to opposite of system preference
        return systemTheme === 'dark' ? 'light' : 'dark';
      });
    },
  }), [systemTheme]);

  // Prevent flash of wrong theme during SSR
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ColorModeContext.Provider value={colorModeValue}>
        <EmotionCache>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </EmotionCache>
      </ColorModeContext.Provider>
    </ThemeContext.Provider>
  );
} 