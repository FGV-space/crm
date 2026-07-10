import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrigins } from '../../negotiationsSlice';
import { Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
  color: theme.palette.pre.color,
  borderRadius: 0,
  '.MuiInputBase-input': {
    padding: '6px 16px',
  },
  '.MuiSelect-icon': {
    color: theme.palette.pre.color,
  },
}));

const StyledMenuItem =styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  color: theme.palette.pre.color,
}));

function SelectOrigin({ onChange }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const options = useSelector(state => state.negotiations.origins);
  const theme = useSelector(state => state.app.theme);

  useEffect(() => {
    dispatch(fetchOrigins())
  }, [dispatch]);

  const handleChangeType = (event) => {
    const origin = event.target.value;
    setValue(origin);
    onChange(origin);
  };

  return (
    <StyledSelect
      value={value}
      label="origin"
      name="origin"
      onChange={handleChangeType}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: (theme === 'dark') ? '#2F333D' : '#ffffff',
            boxShadow: 'none'
          },
        },
      }}
    >
      <StyledMenuItem value={''}></StyledMenuItem>
      {options?.map((item, index) => (
        <StyledMenuItem
          key={index}
          value={item}
        >
          {item}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
}

export default SelectOrigin;
