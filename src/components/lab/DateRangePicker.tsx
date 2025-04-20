'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Popover, 
  Paper, 
  IconButton,
  Typography,
  Button,
  styled,
  SxProps,
  Theme,
  useTheme,
  alpha
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TodayIcon from '@mui/icons-material/Today';
import CheckIcon from '@mui/icons-material/Check';

// DateRangePicker Types
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  /**
   * Current value of the date range
   */
  value: DateRange;
  
  /**
   * Callback fired when the value changes
   */
  onChange: (dateRange: DateRange) => void;
  
  /**
   * Start date input label
   */
  startLabel?: string;
  
  /**
   * End date input label
   */
  endLabel?: string;
  
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  
  /**
   * Disable the component
   */
  disabled?: boolean;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Custom styles
   */
  sx?: SxProps<Theme>;
  
  /**
   * Custom format for date display
   */
  formatDate?: (date: Date | null) => string;
}

// Styled components
const CalendarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

const DayGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(0.5),
}));

const DayCell = styled(Button, {
  shouldForwardProp: (prop) => 
    prop !== 'isSelected' && 
    prop !== 'isInRange' && 
    prop !== 'isToday' &&
    prop !== 'isDisabled'
})<{ 
  isSelected?: boolean;
  isInRange?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
}>(({ theme, isSelected, isInRange, isToday, isDisabled }) => ({
  minWidth: 36,
  minHeight: 36,
  padding: 0,
  borderRadius: '50%',
  color: isDisabled ? theme.palette.text.disabled : theme.palette.text.primary,
  backgroundColor: 'transparent',
  cursor: isDisabled ? 'default' : 'pointer',
  
  ...(isToday && {
    border: `1px solid ${theme.palette.primary.main}`,
  }),
  
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  
  ...(isInRange && !isSelected && {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
  }),
  
  ...(isDisabled && {
    opacity: 0.5,
    pointerEvents: 'none',
  }),
}));

/**
 * Custom DateRangePicker component using MUI v7 core components
 * Replaces the @mui/lab DateRangePicker component
 */
export default function DateRangePicker({
  value,
  onChange,
  startLabel = 'Start Date',
  endLabel = 'End Date',
  minDate,
  maxDate,
  disabled = false,
  sx = {},
  formatDate = (date) => date ? date.toLocaleDateString() : '',
}: DateRangePickerProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  
  // Calendar state
  const [viewDate, setViewDate] = useState<Date>(
    value.startDate || new Date()
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectingStart, setSelectingStart] = useState<boolean>(true);
  
  // Handle input click to open the calendar
  const handleInputClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
      // Reset to selecting start date if both dates are already selected
      if (value.startDate && value.endDate) {
        setSelectingStart(true);
      }
    }
  };
  
  // Handle calendar close
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // Navigate to previous month
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };
  
  // Handle date selection in the calendar
  const handleDateSelect = (date: Date) => {
    if (selectingStart) {
      // If selecting start date, set it and prepare to select end date
      onChange({
        startDate: date,
        endDate: null
      });
      setSelectingStart(false);
    } else {
      // If selecting end date
      const { startDate } = value;
      if (startDate) {
        // Ensure the end date is after the start date
        if (date < startDate) {
          onChange({
            startDate: date,
            endDate: startDate
          });
        } else {
          onChange({
            startDate,
            endDate: date
          });
        }
        handleClose();
      }
    }
  };
  
  // Handle date hover for range preview
  const handleDateHover = (date: Date) => {
    setHoverDate(date);
  };
  
  // Generate days for the current month view
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of week for the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Create an array for the days
    const days: (Date | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  // Check if a date is within the selected/preview range
  const isInRange = (date: Date) => {
    const { startDate, endDate } = value;
    if (!startDate) return false;
    if (endDate) {
      return date > startDate && date < endDate;
    }
    if (!selectingStart && hoverDate) {
      return (
        (date > startDate && date < hoverDate) || 
        (date < startDate && date > hoverDate)
      );
    }
    return false;
  };
  
  // Check if a date is disabled
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };
  
  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  // Check if a date is selected (start or end)
  const isSelected = (date: Date) => {
    const { startDate, endDate } = value;
    if (!date) return false;
    
    const isSameDate = (d1: Date | null, d2: Date) => {
      if (!d1) return false;
      return (
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
      );
    };
    
    return isSameDate(startDate, date) || isSameDate(endDate, date);
  };
  
  // Get month name
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  // Days of week
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Calendar is open or not
  const open = Boolean(anchorEl);
  
  return (
    <Box sx={sx}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2,
          alignItems: 'center'
        }}
      >
        <TextField
          label={startLabel}
          value={formatDate(value.startDate)}
          onClick={handleInputClick}
          inputRef={startInputRef}
          disabled={disabled}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <CalendarMonthIcon color="action" sx={{ cursor: 'pointer' }} />
            ),
          }}
          fullWidth
        />
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary'
          }}
        >
          <ArrowForwardIcon />
        </Box>
        <TextField
          label={endLabel}
          value={formatDate(value.endDate)}
          onClick={handleInputClick}
          inputRef={endInputRef}
          disabled={disabled}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <CalendarMonthIcon color="action" sx={{ cursor: 'pointer' }} />
            ),
          }}
          fullWidth
        />
      </Box>
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ mt: 1 }}
      >
        <Paper sx={{ width: { xs: 300, sm: 600 }, p: 2 }}>
          <CalendarContainer>
            {/* Start month calendar */}
            <Box sx={{ flexGrow: 1, minWidth: 250 }}>
              <CalendarHeader>
                <IconButton onClick={handlePrevMonth} size="small">
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="subtitle1">
                  {getMonthName(viewDate)} {viewDate.getFullYear()}
                </Typography>
                <IconButton onClick={handleNextMonth} size="small">
                  <ArrowForwardIcon />
                </IconButton>
              </CalendarHeader>
              
              <DayGrid>
                {/* Weekday headers */}
                {weekdays.map((day) => (
                  <Box 
                    key={day} 
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      color: 'text.secondary',
                      py: 0.5
                    }}
                  >
                    {day}
                  </Box>
                ))}
                
                {/* Calendar days */}
                {generateCalendarDays().map((date, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    {date ? (
                      <DayCell
                        onClick={() => handleDateSelect(date)}
                        onMouseEnter={() => handleDateHover(date)}
                        isSelected={isSelected(date)}
                        isInRange={isInRange(date)}
                        isToday={isToday(date)}
                        isDisabled={isDateDisabled(date)}
                        disableRipple={isDateDisabled(date)}
                      >
                        {date.getDate()}
                      </DayCell>
                    ) : (
                      <Box sx={{ width: 36, height: 36 }} />
                    )}
                  </Box>
                ))}
              </DayGrid>
            </Box>
            
            {/* End month calendar - only shown on larger screens */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                minWidth: 250,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              <CalendarHeader>
                <Typography variant="subtitle1">
                  {getMonthName(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} {
                    viewDate.getMonth() === 11 
                      ? viewDate.getFullYear() + 1 
                      : viewDate.getFullYear()
                  }
                </Typography>
              </CalendarHeader>
              
              <DayGrid>
                {/* Weekday headers */}
                {weekdays.map((day) => (
                  <Box 
                    key={`next-${day}`} 
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      color: 'text.secondary',
                      py: 0.5
                    }}
                  >
                    {day}
                  </Box>
                ))}
                
                {/* Calendar days for next month */}
                {(() => {
                  const nextMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
                  const year = nextMonth.getFullYear();
                  const month = nextMonth.getMonth();
                  const firstDay = new Date(year, month, 1);
                  const lastDay = new Date(year, month + 1, 0);
                  const firstDayOfWeek = firstDay.getDay();
                  
                  const days: (Date | null)[] = [];
                  
                  for (let i = 0; i < firstDayOfWeek; i++) {
                    days.push(null);
                  }
                  
                  for (let day = 1; day <= lastDay.getDate(); day++) {
                    days.push(new Date(year, month, day));
                  }
                  
                  return days.map((date, index) => (
                    <Box key={`next-${index}`} sx={{ textAlign: 'center' }}>
                      {date ? (
                        <DayCell
                          onClick={() => handleDateSelect(date)}
                          onMouseEnter={() => handleDateHover(date)}
                          isSelected={isSelected(date)}
                          isInRange={isInRange(date)}
                          isToday={isToday(date)}
                          isDisabled={isDateDisabled(date)}
                          disableRipple={isDateDisabled(date)}
                        >
                          {date.getDate()}
                        </DayCell>
                      ) : (
                        <Box sx={{ width: 36, height: 36 }} />
                      )}
                    </Box>
                  ));
                })()}
              </DayGrid>
            </Box>
          </CalendarContainer>
          
          {/* Bottom controls */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 2, 
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`
            }}
          >
            <Button
              startIcon={<TodayIcon />}
              onClick={() => {
                const today = new Date();
                setViewDate(today);
                if (selectingStart) {
                  onChange({
                    startDate: today,
                    endDate: null
                  });
                  setSelectingStart(false);
                }
              }}
            >
              Today
            </Button>
            
            <Box>
              <Button onClick={handleClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<CheckIcon />}
                onClick={handleClose}
                disabled={!value.startDate}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Paper>
      </Popover>
    </Box>
  );
} 