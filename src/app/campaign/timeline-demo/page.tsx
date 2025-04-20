'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper, Button } from '@mui/material';
import CampaignTimeline from '@/components/campaign/CampaignTimeline';
import CampaignTimelineCards from '@/components/campaign/CampaignTimelineCards';
import CampaignTimelineStepper from '@/components/campaign/CampaignTimelineStepper';
import CampaignTimelineEnhanced from '@/components/campaign/CampaignTimelineEnhanced';

// Sample data for all timeline implementations
const sampleTimelinePoints = [
  {
    id: '1',
    date: '2024-01-15',
    title: 'Campaign Beginning',
    summary: 'The heroes meet in a tavern and decide to join forces against a growing evil in the realm.',
    status: 'completed' as const,
  },
  {
    id: '2',
    date: '2024-02-01',
    title: 'The First Quest',
    summary: 'Our heroes venture into the Mistwood Forest to investigate rumors of strange creatures.',
    status: 'completed' as const,
  },
  {
    id: '3',
    date: '2024-02-28',
    title: 'Discovery of the Ancient Artifact',
    summary: 'The party discovers an ancient artifact with mysterious powers in the ruins of an old temple.',
    status: 'completed' as const,
  },
  {
    id: '4',
    date: '2024-03-15',
    title: 'Battle with the Cult',
    summary: 'A fierce battle with a cult seeking to use the artifact for nefarious purposes.',
    status: 'current' as const,
  },
  {
    id: '5',
    date: '2024-04-01',
    title: 'Journey to the Capital',
    summary: 'The party must travel to the capital city to warn the king of the impending danger.',
    status: 'upcoming' as const,
  },
  {
    id: '6',
    date: '2024-04-20',
    title: 'Final Confrontation',
    summary: 'The heroes prepare for a final confrontation with the cult leader.',
    status: 'upcoming' as const,
  },
];

// Extended data for cards implementation
const sampleTimelineEvents = sampleTimelinePoints.map(point => ({
  ...point,
  details: `Extended details about ${point.title}. This provides more comprehensive information about what happened during this event and its significance to the overall campaign narrative.`,
  tags: ['Combat', 'Roleplay', 'Exploration'].sort(() => Math.random() - 0.5).slice(0, 2),
}));

// Extended data for stepper implementation
const sampleStepperEvents = sampleTimelinePoints.map(point => ({
  ...point,
  description: point.summary,
  highlights: [
    `Key moment: ${point.title}`,
    'Character development',
    'Plot advancement',
    'World building'
  ].sort(() => Math.random() - 0.5).slice(0, 3),
  location: ['Mistwood Forest', 'Ancient Temple', 'Dragon\'s Keep', 'Royal Castle', 'Forgotten Caves']
    [Math.floor(Math.random() * 5)],
}));

// Combined data for enhanced timeline
const sampleEnhancedPoints = sampleTimelinePoints.map(point => ({
  ...point,
  details: `Extended details about ${point.title}. This provides more comprehensive information about what happened during this event and its significance to the overall campaign narrative.`,
  highlights: [
    `Key moment: ${point.title}`,
    'Character development',
    'Plot advancement',
    'World building'
  ].sort(() => Math.random() - 0.5).slice(0, 3),
  location: ['Mistwood Forest', 'Ancient Temple', 'Dragon\'s Keep', 'Royal Castle', 'Forgotten Caves']
    [Math.floor(Math.random() * 5)],
}));

export default function TimelineDemo() {
  const [tabValue, setTabValue] = useState(0);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('vertical');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePointClick = (point: any) => {
    console.log('Clicked on timeline point:', point);
  };

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Campaign Timeline Implementations
      </Typography>
      
      <Paper sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Horizontal Timeline" />
          <Tab label="Cards Timeline" />
          <Tab label="Stepper Timeline" />
          <Tab label="Enhanced Timeline" />
        </Tabs>
      </Paper>

      {tabValue === 2 && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={toggleOrientation}>
            Switch to {orientation === 'horizontal' ? 'Vertical' : 'Horizontal'} View
          </Button>
        </Box>
      )}

      <Box>
        {tabValue === 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>1. Horizontal Scrollable Timeline</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Features alternating content pattern, visual indicators, tooltips, and hover effects.
            </Typography>
            <Paper elevation={3} sx={{ p: 0, overflow: 'hidden' }}>
              <CampaignTimeline 
                points={sampleTimelinePoints} 
                onPointClick={handlePointClick} 
              />
            </Paper>
          </Box>
        )}

        {tabValue === 1 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>2. Cards-Based Timeline</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Features expandable cards, tags, and a vertical connecting line showing progression.
            </Typography>
            <Paper elevation={3} sx={{ p: 0, overflow: 'hidden' }}>
              <CampaignTimelineCards 
                events={sampleTimelineEvents} 
                onEventClick={handlePointClick} 
              />
            </Paper>
          </Box>
        )}

        {tabValue === 2 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>3. Interactive Stepper Timeline</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Features a guided timeline experience with expandable details and navigation controls.
            </Typography>
            <Paper elevation={3} sx={{ p: 0, overflow: 'hidden' }}>
              <CampaignTimelineStepper 
                events={sampleStepperEvents} 
                onEventClick={handlePointClick}
                orientation={orientation}
              />
            </Paper>
          </Box>
        )}

        {tabValue === 3 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>4. Enhanced Timeline (Combined Features)</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Combines the horizontal layout with expandable content, highlights, and location information.
              Now with controls to expand/collapse all items and toggle between horizontal and vertical layouts.
            </Typography>
            <Paper elevation={3} sx={{ p: 0, overflow: 'hidden' }}>
              <CampaignTimelineEnhanced 
                points={sampleEnhancedPoints} 
                onPointClick={handlePointClick} 
              />
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
} 