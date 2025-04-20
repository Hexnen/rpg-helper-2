'use client';

import React, { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useTabContext } from './TabContext';

export interface TabPanelProps {
  /**
   * The content of the tab panel
   */
  children?: ReactNode;
  
  /**
   * The value of the tab panel, which is used to determine if the panel is active
   */
  value: string;
  
  /**
   * Custom SX styles
   */
  sx?: SxProps<Theme>;
  
  /**
   * If true, keep the component mounted even when not visible
   */
  keepMounted?: boolean;
}

/**
 * Custom TabPanel component using MUI v7 core components
 * Replaces the @mui/lab TabPanel component
 */
export default function TabPanel({
  children,
  value,
  sx = {},
  keepMounted = false,
}: TabPanelProps) {
  const { value: contextValue } = useTabContext();
  const isHidden = value !== contextValue;
  
  // If not keepMounted and hidden, return null
  if (!keepMounted && isHidden) {
    return null;
  }
  
  return (
    <Box
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={isHidden}
      sx={{
        p: 3, // Default padding
        ...sx,
      }}
    >
      {/* Only render content if visible or keepMounted */}
      {(!isHidden || keepMounted) && children}
    </Box>
  );
} 