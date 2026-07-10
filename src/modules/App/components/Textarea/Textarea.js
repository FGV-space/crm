import React from 'react';
import { styled } from '@mui/material/styles';

const Container = styled('textarea')(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
  color: theme.palette.pre.color,
}));

function Textarea(props) {
  return (
    <Container
      className={'pre'}
      {...props}
    />
  );
}

export default Textarea
