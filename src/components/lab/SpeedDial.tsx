'use client';

import React, { ReactNode, useState } from 'react';
import { 
  Box,
  Backdrop,
  Fab,
  Paper,
  Grow,
  ClickAwayListener,
  styled,
  SxProps,
  Theme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

// Styled components for SpeedDial
const SpeedDialContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Styled components for SpeedDialAction
const SpeedDialActionPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(1),
  transition: theme.transitions.create(['transform', 'opacity']),
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    boxShadow: theme.shadows[4],
  }
}));

export interface SpeedDialProps {
  /**
   * The icon to display in the SpeedDial Fab
   */
  icon?: ReactNode;
  
  /**
   * The icon to display in the SpeedDial Fab when open
   */
  openIcon?: ReactNode;
  
  /**
   * If true, the SpeedDial will be open
   */
  open?: boolean;
  
  /**
   * The direction of the SpeedDial actions
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  
  /**
   * Callback fired when the component requests to be open/closed
   */
  onOpen?: () => void;
  onClose?: () => void;
  
  /**
   * The array of SpeedDialActions to display when the SpeedDial is open
   */
  children: ReactNode;
  
  /**
   * If true, the backdrop will be visible when the SpeedDial is open
   */
  useBackdrop?: boolean;
  
  /**
   * Color of the Fab
   */
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  
  /**
   * Custom SX styles
   */
  sx?: SxProps<Theme>;
}

export interface SpeedDialActionProps {
  /**
   * The icon to display in the SpeedDial Action
   */
  icon: ReactNode;
  
  /**
   * The label to display next to the action
   */
  tooltipTitle?: string;
  
  /**
   * Callback fired when the action is clicked
   */
  onClick?: () => void;
  
  /**
   * Custom SX styles
   */
  sx?: SxProps<Theme>;
}

/**
 * Custom SpeedDial component using MUI v7 core components
 * Replaces the @mui/lab SpeedDial component
 */
export function SpeedDial({
  icon = <AddIcon />,
  openIcon = <CloseIcon />,
  open: controlledOpen,
  direction = 'up',
  onOpen,
  onClose,
  children,
  useBackdrop = true,
  color = 'primary',
  sx = {},
}: SpeedDialProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleToggle = () => {
    if (isOpen) {
      if (onClose) onClose();
      if (controlledOpen === undefined) setInternalOpen(false);
    } else {
      if (onOpen) onOpen();
      if (controlledOpen === undefined) setInternalOpen(true);
    }
  };
  
  const handleClose = () => {
    if (onClose) onClose();
    if (controlledOpen === undefined) setInternalOpen(false);
  };
  
  // Calculate positions for actions based on direction
  const getActionsContainerStyle = (): SxProps<Theme> => {
    switch (direction) {
      case 'up':
        return {
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column-reverse',
          marginBottom: 1,
        };
      case 'down':
        return {
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 1,
        };
      case 'left':
        return {
          position: 'absolute',
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'row-reverse',
          marginRight: 1,
        };
      case 'right':
        return {
          position: 'absolute',
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 1,
        };
      default:
        return {};
    }
  };
  
  return (
    <>
      {useBackdrop && isOpen && (
        <Backdrop
          open={isOpen}
          onClick={handleClose}
          sx={{ zIndex: 1200 }}
        />
      )}
      <ClickAwayListener onClickAway={handleClose}>
        <SpeedDialContainer sx={sx}>
          {isOpen && (
            <Box
              sx={{
                ...getActionsContainerStyle(),
                zIndex: 1300,
              }}
            >
              {React.Children.map(children, (child, index) => (
                <Grow
                  in={isOpen}
                  style={{ transformOrigin: '0 0 0' }}
                  timeout={(index + 1) * 100}
                >
                  {React.isValidElement(child) ? child : <div>{child}</div>}
                </Grow>
              ))}
            </Box>
          )}
          <Fab
            color={color}
            onClick={handleToggle}
            aria-expanded={isOpen}
            sx={{ zIndex: 1300 }}
          >
            {isOpen ? openIcon : icon}
          </Fab>
        </SpeedDialContainer>
      </ClickAwayListener>
    </>
  );
}

/**
 * SpeedDialAction component for using with SpeedDial
 * Replaces the @mui/lab SpeedDialAction component
 */
SpeedDial.Action = function SpeedDialAction({
  icon,
  tooltipTitle,
  onClick,
  sx = {},
}: SpeedDialActionProps) {
  return (
    <SpeedDialActionPaper
      onClick={onClick}
      sx={sx}
      title={tooltipTitle}
    >
      <Box display="flex" alignItems="center">
        <Box component="span" display="flex" p={1}>
          {icon}
        </Box>
        {tooltipTitle && (
          <Box component="span" pl={1}>
            {tooltipTitle}
          </Box>
        )}
      </Box>
    </SpeedDialActionPaper>
  );
};

export default SpeedDial; 