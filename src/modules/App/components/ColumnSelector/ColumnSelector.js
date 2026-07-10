import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { buttonStyleBlue, buttonStyleBlueLight } from '../../../../util/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { styled } from '@mui/material/styles';

function ColumnSelector({ columns, onToggle }) {
  const theme = useSelector(state => state.app.theme);
  const menuRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (column) => {
    onToggle(column);
  };

  const ButtonFilterOptions = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.buttonFilterOptions.backgroundColor,
    border: theme.palette.buttonFilterOptions.border,
    ul: {
      li: {
        '&.show': {
          color: theme.palette.primary.main,
        },
        '&:hover': {
          backgroundColor: theme.palette.buttonFilterOptions.backgroundColorHover,
        }
      }
    }
  }));

  return (
    <div
      ref={menuRef}
      className={'button-filter'}
    >
      <Button
        variant={theme === 'dark' ? 'outlined' : 'contained'}
        style={theme === 'dark' ? buttonStyleBlue : buttonStyleBlueLight}
        startIcon={<FontAwesomeIcon icon={'fa-table-columns'} />}
        onClick={() => setShowOptions(!showOptions)}
        disableElevation={Boolean(theme === 'light')}
      >
        Colonne
      </Button>
      {showOptions && (
        <ButtonFilterOptions
          className={'button-filter-options'}
        >
          <ul
            className={'button-filter-options-list'}
          >
            {columns.map((column, index) => (
              <li
                key={index} onClick={() => handleOptionClick(column)}
                className={(column.show) ? 'show' : ''}
              >
                <span
                  style={{
                    marginRight: 8,
                  }}
                >
                  <FontAwesomeIcon
                    icon={['fa-regular', (column.show) ? 'fa-square-check' : 'fa-square'].join(' ')}
                  />
                </span>
                <span>
                  <FormattedMessage id={column.label} defaultMessage={column.label} />
                </span>
              </li>
            ))}
          </ul>
        </ButtonFilterOptions>
      )}
    </div>
  )
}

export default ColumnSelector;
