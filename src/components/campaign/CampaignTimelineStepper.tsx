'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent, 
  Typography, 
  Button, 
  Paper, 
  StepButton,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StarsIcon from '@mui/icons-material/Stars';

export interface StepperEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  highlights?: string[];
  location?: string;
}

export interface CampaignTimelineStepperProps {
  events: StepperEvent[];
  initialActiveStep?: number;
  onEventClick?: (event: StepperEvent) => void;
  orientation?: 'horizontal' | 'vertical';
}

export default function CampaignTimelineStepper({ 
  events, 
  initialActiveStep = -1,
  onEventClick,
  orientation = 'vertical' 
}: CampaignTimelineStepperProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  // Sort events chronologically
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleStep = (step: number) => () => {
    setActiveStep(step === activeStep ? -1 : step);
    if (onEventClick && step !== activeStep) {
      onEventClick(sortedEvents[step]);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const newStep = prevActiveStep + 1;
      if (newStep < sortedEvents.length && onEventClick) {
        onEventClick(sortedEvents[newStep]);
      }
      return newStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      const newStep = prevActiveStep - 1;
      if (newStep >= 0 && onEventClick) {
        onEventClick(sortedEvents[newStep]);
      }
      return newStep;
    });
  };

  const handleComplete = () => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon fontSize="small" />;
      case 'current':
        return <StarsIcon fontSize="small" />;
      default:
        return <RadioButtonUncheckedIcon fontSize="small" />;
    }
  };

  // For horizontal stepper, we use a more compact view
  if (orientation === 'horizontal') {
    return (
      <Box sx={{ width: '100%', p: 2 }}>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel 
          nonLinear
          sx={{ 
            overflowX: 'auto',
            '& .MuiStepConnector-line': {
              borderColor: theme.palette.divider,
              borderTopWidth: 3,
              mt: 1
            }
          }}
        >
          {sortedEvents.map((event, index) => {
            const labelProps: any = {};
            if (event.status === 'completed') {
              labelProps.optional = (
                <Typography variant="caption" color="success.main">
                  Completed
                </Typography>
              );
              labelProps.StepIconProps = { icon: <CheckCircleIcon color="success" /> };
            } else if (event.status === 'current') {
              labelProps.optional = (
                <Typography variant="caption" color="primary.main">
                  Current
                </Typography>
              );
            }

            return (
              <Step key={event.id} completed={event.status === 'completed'}>
                <StepButton 
                  onClick={handleStep(index)}
                  sx={{ 
                    '& .MuiStepLabel-iconContainer': {
                      '.Mui-active': { color: theme.palette.primary.main },
                      '.Mui-completed': { color: theme.palette.success.main },
                    }
                  }}
                >
                  <StepLabel {...labelProps} StepIconComponent={() => getStepIcon(event.status)}>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{event.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{event.date}</Typography>
                    </Box>
                  </StepLabel>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>

        {activeStep !== -1 && (
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mt: 2, 
              borderLeft: `5px solid ${
                sortedEvents[activeStep].status === 'completed' 
                  ? theme.palette.success.main 
                  : sortedEvents[activeStep].status === 'current' 
                    ? theme.palette.primary.main 
                    : theme.palette.grey[400]
              }` 
            }}
          >
            <Typography variant="h6" gutterBottom>
              {sortedEvents[activeStep].title}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom color="text.secondary">
              {sortedEvents[activeStep].date}
              {sortedEvents[activeStep].location && ` • ${sortedEvents[activeStep].location}`}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {sortedEvents[activeStep].description}
            </Typography>

            {sortedEvents[activeStep].highlights && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Highlights:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {sortedEvents[activeStep].highlights.map((highlight, idx) => (
                    <Chip 
                      key={idx} 
                      label={highlight} 
                      size="small" 
                      color={sortedEvents[activeStep].status === 'current' ? 'primary' : 'default'}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                startIcon={<KeyboardArrowUpIcon />}
              >
                Previous
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button 
                onClick={handleNext}
                disabled={activeStep === sortedEvents.length - 1}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Next
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    );
  }

  // Vertical stepper (default)
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stepper 
        activeStep={activeStep} 
        orientation="vertical"
        nonLinear
        sx={{ 
          '& .MuiStepConnector-line': {
            borderColor: theme.palette.divider,
            borderLeftWidth: 3,
            ml: 1
          }
        }}
      >
        {sortedEvents.map((event, index) => {
          const stepProps: any = {};
          const labelProps: any = {};
          
          if (event.status === 'completed') {
            stepProps.completed = true;
          }
          
          return (
            <Step key={event.id} {...stepProps}>
              <StepButton 
                onClick={handleStep(index)}
                sx={{ 
                  alignItems: 'flex-start',
                  '& .MuiStepLabel-iconContainer': {
                    pr: 2,
                    pt: 1,
                    '.Mui-active': { color: theme.palette.primary.main },
                    '.Mui-completed': { color: theme.palette.success.main },
                  }
                }}
              >
                <StepLabel
                  {...labelProps}
                  StepIconComponent={() => (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        p: 0.5,
                        borderRadius: '50%',
                        backgroundColor: event.status === 'completed' 
                          ? alpha(theme.palette.success.main, 0.1) 
                          : event.status === 'current' 
                            ? alpha(theme.palette.primary.main, 0.1) 
                            : 'transparent' 
                      }}
                    >
                      {getStepIcon(event.status)}
                    </Box>
                  )}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{event.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{event.date}</Typography>
                    {event.location && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        <EventIcon fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        {event.location}
                      </Typography>
                    )}
                  </Box>
                </StepLabel>
              </StepButton>
              <StepContent>
                <Typography variant="body2">{event.description}</Typography>

                {event.highlights && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Highlights:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {event.highlights.map((highlight, idx) => (
                        <Chip 
                          key={idx} 
                          label={highlight} 
                          size="small" 
                          color={event.status === 'current' ? 'primary' : 'default'}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={index === sortedEvents.length - 1}
                    >
                      {index === sortedEvents.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      onClick={handleStep(-1)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Close
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
} 