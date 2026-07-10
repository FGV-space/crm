import { styled } from '@mui/material/styles';
import {Tab, Tabs} from '@mui/material';
import React from "react";

export const VmsTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: theme.palette.tabSelected.border,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const VmsTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.secondary.main,
  borderLeft: theme.palette.tab.border,
  borderRight: theme.palette.tab.border,
  borderTop: theme.palette.tab.border,
  '&:hover': {
    color: theme.palette.primary.main,
    opacity: 1,
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    borderLeft: theme.palette.tabSelected.border,
    borderRight: theme.palette.tabSelected.border,
    borderTop: theme.palette.tabSelected.border,
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.primary.main,
  },
}));
