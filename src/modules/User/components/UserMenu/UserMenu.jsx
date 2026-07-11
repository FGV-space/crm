import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logOut } from "../../userSlice";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    navigate('/profile');
  };

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  return ([
    <div
      key={'user-menu-button'}
      className={'button'}
      title={'Menù utente'}
      aria-controls={isOpen ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={isOpen ? 'true' : undefined}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={'user-cog'} />
    </div>,
    <Menu
      key={'user-menu'}
      id={'user-menu'}
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClickProfile}>
        <ListItemIcon>
          <FontAwesomeIcon icon={'user-edit'} />
        </ListItemIcon>
        <ListItemText>
          <FormattedMessage id={'editProfile'} />
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClickLogout}>
        <ListItemIcon>
          <FontAwesomeIcon icon={'door-open'} />
        </ListItemIcon>
        <ListItemText>
          <FormattedMessage id={'logout'} />
        </ListItemText>
      </MenuItem>
    </Menu>,
  ]);
}
