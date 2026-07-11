import React from 'react';
import Clock from 'react-live-clock';
import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.clock.backgroundColor,
  color: theme.palette.clock.color,
}));

export default function Watch() {
  return (
    <Container className={'clock'}>
      <Clock
        format={'DD/MM/YY HH:mm:ss'}
        ticking={true}
        timezone={'Europe/Rome'}
      />
    </Container>
  );
}
