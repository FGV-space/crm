import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveUsers } from '../../../User/userSlice';
import { Chip, Box } from '@mui/material';
import { StyledSelect, StyledMenuItem } from '../Select/Select';
import { styled } from '@mui/material/styles';

function SelectUsers(props) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchActiveUsers());
  }, []);

  useEffect(() => {
    if (props.defaultValue) {
      setSelectedUsers(props.defaultValue);
    }
  }, [props.defaultValue]);

  if (!users) return null;

  const UserChip = styled(Chip)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: '12px',
    fontFamily: 'Menlo,Consolas,DejaVu Sans Mono,monospace !important',
  }));

  const handleChange = (event) => {
    if (props.onChange) {
      const { target: { value } } = event;

      setSelectedUsers(typeof value === 'string' ? value.split(',') : value);
      props.onChange(typeof value === 'string' ? value.split(',') : value);
    }
  };

  const getNameAndSurname = (username) => {
    const user = users.find(user => user.username === username);

    return `${user.name} ${user.surname}`;
  };

  return (
    <StyledSelect
      value={selectedUsers}
      onChange={handleChange}
      multiple
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((username) => (
            <UserChip
              key={username}
              label={getNameAndSurname(username)}
              variant="outlined"
            />
          ))}
        </Box>
      )}
    >
      {users.map((user) => (
        <StyledMenuItem
          key={user.username}
          value={user.username}
        >
          {user.name} {user.surname}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
}

export default SelectUsers;
