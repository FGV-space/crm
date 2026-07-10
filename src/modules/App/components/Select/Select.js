import { styled } from '@mui/material/styles';
import { MenuItem, Select } from '@mui/material';

export const StyledSelect = styled(Select)(({ theme }) => ({
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

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: theme.palette.pre.backgroundColor,
    color: theme.palette.pre.color,
}));
