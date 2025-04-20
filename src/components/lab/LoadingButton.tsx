'use client';

import React, { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export interface LoadingButtonProps extends Omit<ButtonProps, 'startIcon' | 'endIcon'> {
  /**
   * Whether the button is in loading state
   */
  loading?: boolean;
  
  /**
   * The position of the loading indicator
   */
  loadingPosition?: 'start' | 'end' | 'center';
  
  /**
   * Element placed before the children if the button is not in loading state
   */
  startIcon?: ReactNode;
  
  /**
   * Element placed after the children if the button is not in loading state
   */
  endIcon?: ReactNode;
  
  /**
   * The size of the loading indicator
   */
  loadingIndicator?: ReactNode;
  
  /**
   * Whether to show the loading indicator
   */
  loadingIndicatorVisible?: boolean;
}

/**
 * Extends the standard Button component with loading state functionality.
 * This is a custom implementation to replace @mui/lab's LoadingButton
 */
export default function LoadingButton({
  children,
  disabled = false,
  loading = false,
  loadingPosition = 'center',
  startIcon,
  endIcon,
  loadingIndicator = <CircularProgress color="inherit" size={20} />,
  loadingIndicatorVisible = true,
  ...buttonProps
}: LoadingButtonProps) {
  const isDisabled = disabled || loading;
  
  const loadingStyles = {
    visibility: loading && loadingIndicatorVisible ? 'visible' : 'hidden',
    position: 'absolute' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const startIconElement = startIcon && (!loading || loadingPosition !== 'start') ? (
    <Box component="span" sx={{ display: 'inherit', mr: 1 }}>
      {startIcon}
    </Box>
  ) : null;
  
  const endIconElement = endIcon && (!loading || loadingPosition !== 'end') ? (
    <Box component="span" sx={{ display: 'inherit', ml: 1 }}>
      {endIcon}
    </Box>
  ) : null;
  
  const centerLoadingIndicator = loadingPosition === 'center' ? (
    <Box
      sx={{
        ...loadingStyles,
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
      }}
    >
      {loadingIndicator}
    </Box>
  ) : null;
  
  const startLoadingIndicator = loadingPosition === 'start' ? (
    <Box
      sx={{
        ...loadingStyles,
        left: 16,
        transform: 'translateX(-50%)',
      }}
    >
      {loadingIndicator}
    </Box>
  ) : null;
  
  const endLoadingIndicator = loadingPosition === 'end' ? (
    <Box
      sx={{
        ...loadingStyles,
        right: 16,
        transform: 'translateX(50%)',
      }}
    >
      {loadingIndicator}
    </Box>
  ) : null;
  
  return (
    <Button
      {...buttonProps}
      disabled={isDisabled}
      sx={{
        position: 'relative',
        ...(loading && loadingPosition === 'center' && {
          color: 'transparent',
        }),
        ...buttonProps.sx,
      }}
    >
      {startLoadingIndicator}
      {startIconElement}
      {children}
      {endIconElement}
      {endLoadingIndicator}
      {centerLoadingIndicator}
    </Button>
  );
} 