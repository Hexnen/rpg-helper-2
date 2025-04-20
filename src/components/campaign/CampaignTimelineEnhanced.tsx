'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tooltip, 
  useTheme, 
  Chip, 
  Collapse, 
  IconButton, 
  Divider, 
  Button,
  ButtonGroup,
  Stack,
  useMediaQuery
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import EventIcon from '@mui/icons-material/Event';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';

export interface EnhancedTimelinePoint {
  id: string;
  date: string;
  title: string;
  summary: string;
  status: 'completed' | 'current' | 'upcoming';
  highlights?: string[];
  location?: string;
  details?: string;
}

export interface CampaignTimelineEnhancedProps {
  points: EnhancedTimelinePoint[];
  onPointClick?: (point: EnhancedTimelinePoint) => void;
  initialDirection?: 'horizontal' | 'vertical';
}

export default function CampaignTimelineEnhanced({ 
  points, 
  onPointClick,
  initialDirection = 'horizontal'
}: CampaignTimelineEnhancedProps) {
  const theme = useTheme();
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  
  // Use useMediaQuery to detect small screens
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Set direction based on screen size - vertical for mobile, initialDirection for larger screens
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
    isMobile ? 'vertical' : initialDirection
  );
  
  // Track if all items are expanded
  const allExpanded = expandedIds.length === points.length;
  
  // Update direction when screen size changes
  useEffect(() => {
    setDirection(isMobile ? 'vertical' : 'horizontal');
  }, [isMobile]);

  // Sort points chronologically
  const sortedPoints = [...points].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const toggleExpandAll = () => {
    if (allExpanded) {
      // If all are currently expanded, collapse all
      setExpandedIds([]);
    } else {
      // Otherwise expand all
      setExpandedIds(sortedPoints.map(point => point.id));
    }
  };

  // Add back the toggleDirection function
  const toggleDirection = () => {
    setDirection(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };

  if (direction === 'vertical') {
    return (
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button 
            variant="outlined"
            onClick={toggleExpandAll}
            startIcon={allExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
            sx={{ width: 140 }}
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </Button>
          {/* Only show toggle on larger screens where it makes sense */}
          {!isMobile && (
            <Button 
              variant="outlined" 
              onClick={toggleDirection}
              startIcon={<SwapHorizIcon />}
              sx={{ width: 180 }}
            >
              Switch to Horizontal
            </Button>
          )}
        </Box>
      
        <Stack spacing={2} sx={{ p: 2 }}>
          {sortedPoints.map((point, index) => {
            const isExpanded = expandedIds.includes(point.id);
            const statusColor = point.status === 'completed' 
              ? theme.palette.success.main 
              : point.status === 'current' 
                ? theme.palette.primary.main
                : theme.palette.grey[400];
                
            return (
              <Box 
                key={point.id}
                sx={{
                  cursor: onPointClick ? 'pointer' : 'default',
                  transition: 'transform 0.2s ease',
                  transform: hoveredPoint === point.id ? 'translateX(8px)' : 'none'
                }}
                onMouseEnter={() => setHoveredPoint(point.id)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => onPointClick && onPointClick(point)}
              >
                <Paper
                  elevation={3}
                  sx={{
                    display: 'flex',
                    borderLeft: `6px solid ${statusColor}`,
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    sx={{ 
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: theme.palette.action.hover,
                      color: statusColor
                    }}
                  >
                    {point.status === 'completed' ? (
                      <CheckCircleIcon />
                    ) : point.status === 'current' ? (
                      <StarIcon />
                    ) : (
                      <EventIcon />
                    )}
                  </Box>
                  
                  <Box sx={{ p: 2, width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {point.title}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={(e) => toggleExpand(point.id, e)}
                        sx={{ ml: 0.5, mt: -0.5, mr: -0.5 }}
                      >
                        {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {point.date}
                      </Typography>
                      {point.location && (
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                          <EventIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                          {point.location}
                        </Typography>
                      )}
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: isExpanded ? 'unset' : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {point.summary}
                    </Typography>

                    <Collapse in={isExpanded} timeout="auto">
                      {(point.details || point.highlights) && <Divider sx={{ my: 1.5 }} />}
                      
                      {point.details && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {point.details}
                        </Typography>
                      )}
                      
                      {point.highlights && point.highlights.length > 0 && (
                        <Box sx={{ mt: 1.5 }}>
                          <Typography variant="caption" fontWeight="bold" display="block" gutterBottom>
                            Highlights:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {point.highlights.map((highlight, idx) => (
                              <Chip
                                key={idx}
                                size="small"
                                label={highlight}
                                icon={<BookmarkIcon fontSize="small" />}
                                variant="outlined"
                                color={point.status === 'current' ? 'primary' : 'default'}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Collapse>
                  </Box>
                </Paper>
              </Box>
            );
          })}
        </Stack>
      </Box>
    );
  }

  // Horizontal layout (default)
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button 
          variant="outlined"
          onClick={toggleExpandAll}
          startIcon={allExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          sx={{ width: 140 }}
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </Button>
        {/* Only show toggle on larger screens where it makes sense */}
        {!isMobile && (
          <Button 
            variant="outlined" 
            onClick={toggleDirection}
            startIcon={<SwapVertIcon />}
            sx={{ width: 180 }}
          >
            Switch to Vertical
          </Button>
        )}
      </Box>
    
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
            padding: '100px 40px',
            justifyContent: 'space-between',
          }}
        >
          {sortedPoints.map((point, index) => {
            const isExpanded = expandedIds.includes(point.id);
            
            return (
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
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {point.title}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={(e) => toggleExpand(point.id, e)}
                          sx={{ ml: 0.5, mt: -1, mr: -1 }}
                        >
                          {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                        </IconButton>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {point.date}
                        </Typography>
                        {point.location && (
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                            <EventIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                            {point.location}
                          </Typography>
                        )}
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: isExpanded ? 'unset' : 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {point.summary}
                      </Typography>

                      <Collapse in={isExpanded} timeout="auto">
                        {(point.details || point.highlights) && <Divider sx={{ my: 1.5 }} />}
                        
                        {point.details && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {point.details}
                          </Typography>
                        )}
                        
                        {point.highlights && point.highlights.length > 0 && (
                          <Box sx={{ mt: 1.5 }}>
                            <Typography variant="caption" fontWeight="bold" display="block" gutterBottom>
                              Highlights:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {point.highlights.map((highlight, idx) => (
                                <Chip
                                  key={idx}
                                  size="small"
                                  label={highlight}
                                  icon={<BookmarkIcon fontSize="small" />}
                                  variant="outlined"
                                  color={point.status === 'current' ? 'primary' : 'default'}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Collapse>
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
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {point.title}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={(e) => toggleExpand(point.id, e)}
                          sx={{ ml: 0.5, mt: -1, mr: -1 }}
                        >
                          {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                        </IconButton>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {point.date}
                        </Typography>
                        {point.location && (
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                            <EventIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                            {point.location}
                          </Typography>
                        )}
                      </Box>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: isExpanded ? 'unset' : 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {point.summary}
                      </Typography>

                      <Collapse in={isExpanded} timeout="auto">
                        {(point.details || point.highlights) && <Divider sx={{ my: 1.5 }} />}
                        
                        {point.details && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {point.details}
                          </Typography>
                        )}
                        
                        {point.highlights && point.highlights.length > 0 && (
                          <Box sx={{ mt: 1.5 }}>
                            <Typography variant="caption" fontWeight="bold" display="block" gutterBottom>
                              Highlights:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {point.highlights.map((highlight, idx) => (
                                <Chip
                                  key={idx}
                                  size="small"
                                  label={highlight}
                                  icon={<BookmarkIcon fontSize="small" />}
                                  variant="outlined"
                                  color={point.status === 'current' ? 'primary' : 'default'}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Collapse>
                    </Paper>
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
} 