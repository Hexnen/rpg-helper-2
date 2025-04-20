'use client';

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Collapse, Divider, Chip, useTheme, alpha } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EventIcon from '@mui/icons-material/Event';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DoneIcon from '@mui/icons-material/Done';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  summary: string;
  details?: string;
  status: 'completed' | 'current' | 'upcoming';
  tags?: string[];
}

export interface CampaignTimelineCardsProps {
  events: TimelineEvent[];
  onEventClick?: (event: TimelineEvent) => void;
}

export default function CampaignTimelineCards({ events, onEventClick }: CampaignTimelineCardsProps) {
  const theme = useTheme();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Sort events chronologically
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Box sx={{ width: '100%', position: 'relative', p: 2 }}>
      {/* Line connecting all cards */}
      <Box 
        sx={{
          position: 'absolute',
          left: 30, 
          top: 0,
          bottom: 0,
          width: 3,
          backgroundColor: theme.palette.primary.light,
          zIndex: 0,
        }}
      />

      {sortedEvents.map((event, index) => {
        const isExpanded = expandedIds.includes(event.id);
        const isLast = index === sortedEvents.length - 1;
        const statusColor = event.status === 'completed' 
          ? theme.palette.success.main 
          : event.status === 'current' 
            ? theme.palette.primary.main 
            : theme.palette.grey[400];

        return (
          <Box 
            key={event.id} 
            sx={{ 
              display: 'flex', 
              mb: isLast ? 0 : 3,
              position: 'relative',
            }}
          >
            {/* Timeline node */}
            <Box 
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: alpha(statusColor, 0.1),
                border: `3px solid ${statusColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                marginRight: 2,
                flexShrink: 0,
              }}
            >
              {event.status === 'completed' ? (
                <DoneIcon sx={{ color: statusColor }} />
              ) : event.status === 'current' ? (
                <ArrowCircleRightIcon sx={{ color: statusColor }} />
              ) : (
                <EventIcon sx={{ color: statusColor }} />
              )}
            </Box>

            {/* Card */}
            <Card 
              sx={{ 
                width: '100%',
                borderLeft: `4px solid ${statusColor}`,
                boxShadow: theme.shadows[isExpanded ? 4 : 2],
                transition: 'box-shadow 0.3s ease-in-out',
                cursor: onEventClick ? 'pointer' : 'default',
                '&:hover': {
                  boxShadow: theme.shadows[4],
                }
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {event.date}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(event.id);
                      }}
                      sx={{ ml: 1 }}
                    >
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  {event.summary}
                </Typography>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 2 }}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                      {event.details || "No additional details available."}
                    </Typography>
                    
                    {event.tags && event.tags.length > 0 && (
                      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {event.tags.map(tag => (
                          <Chip
                            key={tag}
                            size="small"
                            label={tag}
                            icon={<BookmarkIcon fontSize="small" />}
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
} 