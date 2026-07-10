import React from 'react';
import { styled } from '@mui/material/styles';

const Container = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
  color: theme.palette.pre.color,
}));

function Pre({ value, align, children, style }) {
  return (
    <Container
      className={'pre'}
      style={{
        ...style,
        textAlign: (align) ? 'left' : align,
      }}
    >
      {children ? children : value}
    </Container>
  )
}

export default Pre;
