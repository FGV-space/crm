import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
  poo: {
    display: 'block',
    fontSize: '96px'
  },
  error: {
    margin: '0 0 0 0',
    color: '#ff3e3e'
  }
};

const NoPage = () => {
  return (
    <div style={styles.container}>
      <div
        style={styles.poo}
      >
        <FontAwesomeIcon
          icon="fa-duotone fa-poo"
          size="2xl"
        />
      </div>
      <div>
        <h1>shit happens!</h1>
      </div>
      <div>
        <h2
          style={styles.error}
        >
          ERROR 404
        </h2>
      </div>
    </div>
  );
};

export default NoPage;
