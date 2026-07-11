import React, { useState } from 'react';
import { StyledSelect, StyledMenuItem } from '../Select/Select';
import moment from 'moment';

function Reminder(props) {
  const options = [
    0,
    5,
    10,
    15,
    30,
    60,
    120,
    180,
    240,
    300,
    360,
    420,
    480,
    540,
    600,
    660,
    720,
    1440,
    2880,
  ];
  const [value, setValue] = useState(props.value || 0);

  const getDuration = (value) => {
    const duration = moment.duration(value, 'minutes');
    return duration.humanize();
  };

  const handleOnChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setValue(value);
    props.onChange(value);
  }

  return (
    <StyledSelect
      value={value}
      onChange={handleOnChange}
    >
      {options?.map((item, index) => (
        <StyledMenuItem
          key={index}
          value={item}
        >
          {getDuration(item)}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
}

export default Reminder;
