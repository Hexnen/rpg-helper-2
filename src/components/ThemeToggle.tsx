'use client';

import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '@/components/ThemeRegistry';

type ThemeToggleProps = {
  variant?: 'icon' | 'button';
};

export default function ThemeToggle({ variant = 'button' }: ThemeToggleProps) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isDarkMode = theme.palette.mode === 'dark';

  if (variant === 'icon') {
    return (
      <IconButton
        onClick={colorMode.toggleColorMode}
        color="inherit"
        aria-label="toggle theme"
        sx={{ ml: 1 }}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    );
  }

  return (
    <Button
      onClick={colorMode.toggleColorMode}
      variant="outlined"
      startIcon={isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      size="small"
      sx={{ ml: 1 }}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
} 