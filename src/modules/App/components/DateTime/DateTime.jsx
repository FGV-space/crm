import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, PickersActionBar } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';

const Container = styled(DateTimePicker)(({ theme }) => ({
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

const CustomActionBar = styled(PickersActionBar)(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  color: theme.palette.pre.color,
}));

const CustomPopper = styled(Paper)(({ theme }) => ({
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

// https://mui.com/x/api/date-pickers/date-picker/#slots
export default function DateTime(props) {
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setValue(moment(props.value));
  }, [props.value]);

  const handleOnChange = (date) => {
    setValue(date);
    props.onChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container
        value={value}
        onChange={handleOnChange}
        format={'DD-MM-YYYY HH:mm'}
        slots={{
          actionBar: CustomActionBar,
          desktopPaper: CustomPopper,
        }}
        showDaysOutsideCurrentMonth
        displayWeekNumber
      />
    </LocalizationProvider>
  )
}
