import React from 'react';
import { styled } from '@mui/material/styles';

export const Input = styled('input')(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
  color: theme.palette.pre.color,
}));

export const InputGroupButton = styled('div')(({ theme }) => ({
  button: {
    color: theme.palette.pre.color,
  }
}));

export const InputGroup = styled('div')(({ theme }) => ({
  border: theme.palette.pre.border,
}));
