'use client';

import React from 'react';
import { Box, Paper, styled } from '@mui/material';

// Timeline container
const TimelineRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),
  width: '100%',
  overflow: 'hidden',
}));

// Timeline line
const TimelineLine = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '2px',
  backgroundColor: theme.palette.divider,
  top: 0,
  bottom: 0,
  left: 'calc(50% - 1px)',
  zIndex: 0,
}));

// Timeline item container
const TimelineItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  flexShrink: 0,
}));

// Timeline dot (the circle on the line)
const TimelineDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color }) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  backgroundColor: color || theme.palette.primary.main,
  border: `2px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[1],
  zIndex: 1,
  position: 'absolute',
  left: 'calc(50% - 8px)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.2)',
    transition: 'transform 0.2s',
  },
}));

// Timeline content
const TimelineContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: 'calc(50% - 24px)',
  maxWidth: 400,
  margin: theme.spacing(0, 1),
  position: 'relative',
  boxShadow: theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[3],
    transition: 'box-shadow 0.2s',
  },
}));

// Timeline connector (optional line between dot and content)
const TimelineConnector = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  height: '1px',
  backgroundColor: theme.palette.divider,
  zIndex: 0,
  '&.left': {
    right: 'calc(50% + 8px)',
    width: 16,
  },
  '&.right': {
    left: 'calc(50% + 8px)',
    width: 16,
  },
}));

// Timeline props
export interface TimelineProps {
  children?: React.ReactNode;
  sx?: any;
}

// Timeline item props
export interface TimelineItemProps {
  children?: React.ReactNode;
  dotColor?: string;
  sx?: any;
}

// Timeline content props
export interface TimelineContentProps {
  children?: React.ReactNode;
  sx?: any;
}

// Timeline component
export function Timeline({ children, sx = {} }: TimelineProps) {
  return (
    <TimelineRoot sx={sx}>
      <TimelineLine />
      {children}
    </TimelineRoot>
  );
}

// TimelineItem component
Timeline.Item = function TimelineItemComponent({
  children,
  dotColor,
  sx = {},
}: TimelineItemProps) {
  return (
    <TimelineItem sx={sx}>
      <TimelineDot color={dotColor} />
      <TimelineConnector className="left" />
      <TimelineConnector className="right" />
      {children}
    </TimelineItem>
  );
};

// TimelineContent component
Timeline.Content = function TimelineContentComponent({ children, sx = {} }: TimelineContentProps) {
  return (
    <TimelineContent elevation={1} sx={sx}>
      {children}
    </TimelineContent>
  );
};

export default Timeline; 