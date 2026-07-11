import React from 'react';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import { buttonStyleGreen, buttonStyleGreenLight } from '../../../../util/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function ExportToCsv({ data }) {
  const theme = useSelector(state => state.app.theme);

  const handleClick = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'data.csv');
  };

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map((item) => Object.values(item).join(',') + '\n');
    return header + rows.join('');
  };

  return (
    <Button
      variant={theme === 'dark' ? 'outlined' : 'contained'}
      style={theme === 'dark' ? buttonStyleGreen : buttonStyleGreenLight}
      startIcon={<FontAwesomeIcon icon={'fa-regular fa-file-csv'} />}
      onClick={handleClick}
      disableElevation={Boolean(theme === 'light')}
    >
      <FormattedMessage id={'export'} />
    </Button>
  );
}

export default ExportToCsv;
