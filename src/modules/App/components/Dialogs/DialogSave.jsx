import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import { buttonStyleGreen, buttonStyleOrange, buttonStyleGreenLight, buttonStyleOrangeLight } from '../../../../util/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Draggable from 'react-draggable';
import { injectIntl } from 'react-intl';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.pre.backgroundColor,
  }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function DialogSave(props) {
  const theme = useSelector(state => state.app.theme);

  return (
    <StyledDialog
      open={props.open}
      onClose={props.onUndo}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <StyledDialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {props.intl.messages.warning}
      </StyledDialogTitle>
      <DialogContent>
        <StyledDialogContentText>
          {props.text}
        </StyledDialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant={theme === 'dark' ? 'outlined' : 'contained'}
          style={theme === 'dark' ? buttonStyleOrange : buttonStyleOrangeLight}
          onClick={props.onUndo}
          startIcon={<FontAwesomeIcon icon={'fa-xmark'} />}
          disableElevation={Boolean(theme === 'light')}
        >
          {props.intl.messages.no}
        </Button>
        <Button
          variant={theme === 'dark' ? 'outlined' : 'contained'}
          style={theme === 'dark' ? buttonStyleGreen: buttonStyleGreenLight}
          onClick={props.onConfirm}
          startIcon={<FontAwesomeIcon icon={'fa-floppy-disk'} />}
          disableElevation={Boolean(theme === 'light')}
        >
          {props.intl.messages.yes}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default injectIntl(DialogSave);
