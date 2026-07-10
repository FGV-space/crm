import React from 'react';
import { parseCoordinates } from '../../../../util/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';

const Container = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
  color: theme.palette.pre.color,
  a: {
    color: theme.palette.pre.color,
  }
}));

function Location({ location }) {
  const { coordinates } = location;

  if (coordinates.length) {
    return (
      <Container className={'pre'}>
        {parseCoordinates(coordinates[0], coordinates[1])}
        <a
          style={{
            transition: 'color linear 0.2s',
            display: 'block',
            position: 'absolute',
            right: 12,
            top: 9,
          }}
          href={`https://maps.google.it/maps?q=${coordinates[0]}%2C${coordinates[1]}`}
          target="_blank"
        >
          <FontAwesomeIcon icon={'map-marked-alt'} />
        </a>
      </Container>
    );
  }

  return (
    <Container className={'pre'}>&nbsp;</Container>
  );
}

export default Location;
