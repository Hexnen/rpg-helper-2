'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Tooltip, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

export interface TimelinePoint {
  id: string;
  date: string;
  title: string;
  summary: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface CampaignTimelineProps {
  points: TimelinePoint[];
  onPointClick?: (point: TimelinePoint) => void;
}

export default function CampaignTimeline({ points, onPointClick }: CampaignTimelineProps) {
  const theme = useTheme();
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // Sort points chronologically if needed
  const sortedPoints = [...points].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Box 
      sx={{
        width: '100%',
        position: 'relative',
        overflowX: 'auto',
        padding: 2,
        '&::-webkit-scrollbar': {
          height: 8,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main,
          borderRadius: 4,
        }
      }}
    >
      {/* Timeline base line */}
      <Box 
        sx={{
          position: 'absolute',
          left: 0,
          right: 0, 
          top: '50%',
          height: 3,
          backgroundColor: theme.palette.divider,
          transform: 'translateY(-50%)',
          zIndex: 0,
        }}
      />
      
      {/* Timeline content */}
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          minWidth: points.length * 250,
          position: 'relative',
          padding: '80px 40px',
          justifyContent: 'space-between',
        }}
      >
        {sortedPoints.map((point, index) => (
          <Box 
            key={point.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 220,
              position: 'relative',
              zIndex: 1,
              cursor: onPointClick ? 'pointer' : 'default',
              transform: hoveredPoint === point.id ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
            onClick={() => onPointClick && onPointClick(point)}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Top section (for even items) */}
            {index % 2 === 0 && (
              <>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    width: '100%',
                    marginBottom: 2,
                    borderLeft: `4px solid ${
                      point.status === 'completed' 
                        ? theme.palette.success.main 
                        : point.status === 'current' 
                          ? theme.palette.primary.main
                          : theme.palette.grey[400]
                    }`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {point.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {point.date}
                  </Typography>
                  <Tooltip title={point.summary} arrow placement="top">
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {point.summary}
                    </Typography>
                  </Tooltip>
                </Paper>
                <Box 
                  sx={{ 
                    height: 30,
                    width: 2,
                    backgroundColor: theme.palette.divider,
                  }} 
                />
              </>
            )}

            {/* Timeline point */}
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                bgcolor: 'background.paper',
                border: `3px solid ${
                  point.status === 'completed' 
                    ? theme.palette.success.main 
                    : point.status === 'current' 
                      ? theme.palette.primary.main
                      : theme.palette.grey[400]
                }`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              {point.status === 'completed' ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : point.status === 'current' ? (
                <StarIcon color="primary" fontSize="small" />
              ) : null}
            </Box>

            {/* Bottom section (for odd items) */}
            {index % 2 === 1 && (
              <>
                <Box 
                  sx={{ 
                    height: 30,
                    width: 2,
                    backgroundColor: theme.palette.divider,
                  }} 
                />
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    width: '100%',
                    marginTop: 2,
                    borderLeft: `4px solid ${
                      point.status === 'completed' 
                        ? theme.palette.success.main 
                        : point.status === 'current' 
                          ? theme.palette.primary.main
                          : theme.palette.grey[400]
                    }`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {point.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {point.date}
                  </Typography>
                  <Tooltip title={point.summary} arrow placement="bottom">
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {point.summary}
                    </Typography>
                  </Tooltip>
                </Paper>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
} 