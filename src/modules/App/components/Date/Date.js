import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DateCalendar } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { styled } from '@mui/material/styles';

const Container = styled(DatePicker)(({ theme }) => ({
  '.MuiInputBase-root': {
    backgroundColor: theme.palette.pre.backgroundColor,
    border: 'none',
    borderRadius: 0,
    color: theme.palette.pre.color,
  },
  '.MuiInputBase-input': {
    padding: '8px 16px'
  },
  '.MuiButtonBase-root': {
    color: theme.palette.pre.color,
  },
}));

const Calendar = styled(DateCalendar)(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
  '.MuiPickersDay-root': {
    color: theme.palette.pre.color,
  },
  '.MuiPickersDay-today': {
    border: `1px solid ${theme.palette.primary.main}`,
    '&.MuiPickersDay-root:not(.Mui-selected)': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  '.MuiDayCalendar-weekDayLabel': {
    color: theme.palette.datePicker.weekDayLabel.color,
    fontWeight: 'bold',
  },
  '.MuiPickersDay-dayOutsideMonth': {
    color: theme.palette.datePicker.dayOutsideMonth.color,
  },
  '.MuiPickersCalendarHeader-root': {
    color: theme.palette.primary.main,
  },
  '.MuiPickersCalendarHeader-switchViewButton': {
    color: theme.palette.primary.main,
  },
  '.MuiPickersArrowSwitcher-button': {
    color: theme.palette.primary.main,
  },
  '.MuiPickersYear-root': {
    color: theme.palette.pre.color,
  },
  '.MuiDayCalendar-weekNumber': {
    color: theme.palette.datePicker.weekDayLabel.color,
    fontWeight: 'bold',
  },
}));

function Layout(props) {
  return (
    <Calendar {...props} showDaysOutsideCurrentMonth displayWeekNumber />
  );
}

export default function Date(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container
        value={props.value}
        format={'DD-MM-YYYY'}
        onChange={(newValue) => props.onChange(newValue)}
        slots={{
          layout: Layout,
        }}
      />
    </LocalizationProvider>
  );
}
