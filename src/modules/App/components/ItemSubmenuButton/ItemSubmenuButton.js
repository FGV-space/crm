import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.pre.color,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.pre.backgroundColor,
  }
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.pre.color,
}));

function ItemSubmenuButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return ([
    <StyledIconButton
      key={'main-button'}
      aria-label="more"
      id="long-button"
      aria-controls={open ? 'long-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={'ellipsis'} />
    </StyledIconButton>,
    <StyledMenu
      key={'main-menu'}
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
    >
      <StyledMenuItem
        key={'add-item-after'}
        onClick={() => props.onAddItemAfter()}
        disableRipple
      >
        <FontAwesomeIcon icon={'plus'} style={{ marginRight: '1em' }} />
        Aggiungi sotto
      </StyledMenuItem>
      <StyledMenuItem
        key={'add-item-before'}
        onClick={() => props.onAddItemBefore()}
        disableRipple
      >
        <FontAwesomeIcon icon={'plus'} style={{ marginRight: '1em' }} />
        Aggiungi sopra
      </StyledMenuItem>
      <StyledMenuItem
        key={'clone-item-after'}
        onClick={() => props.onCloneItemAfter()}
        disableRipple
      >
        <FontAwesomeIcon icon={'clone'} style={{ marginRight: '1em' }} />
        Duplica sotto
      </StyledMenuItem>
      <StyledMenuItem
        key={'clone-item-before'}
        onClick={() => props.onCloneItemBefore()}
        disableRipple
      >
        <FontAwesomeIcon icon={'clone'} style={{ marginRight: '1em' }} />
        Duplica sopra
      </StyledMenuItem>
      <StyledMenuItem
        key={'delete-item'}
        onClick={() => props.onRemove()}
        disableRipple
      >
        <FontAwesomeIcon icon={'trash'} style={{ marginRight: '1em' }} />
        Elimina
      </StyledMenuItem>
    </StyledMenu>,
  ]);
}

export default ItemSubmenuButton;
