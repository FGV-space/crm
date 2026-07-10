import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { buttonStyleGreen, buttonStyleGreenLight } from '../../../../util/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import moment from 'moment';

function translateOperator(operator) {
  switch (operator) {
    case '$gt':
      return 'isGreaterThan';
    case '$lt':
      return 'isLessThan';
    case '$eq':
    case 'regexEq':
      return 'isEqual';
    case '$ne':
    case 'regexNe':
      return 'isNotEqual';
    case '$in':
    case 'regexLike':
      return 'contains';
    case 'regexStart':
      return 'startWith';
    case 'regexEnds':
      return 'endsWith';
    case '$nin':
      return 'doesNotContain';
    default:
      return 'isBetween';
  }
}

function Item(props) {
  const theme = useSelector(state => state.app.theme);
  const values = Object.keys(props.value);

  const handleButtonClick = (key) => {
    props.onClick(key);
  };

  const getLabel = (value) => {
    const result = props.column.values.find(v => v[props.column.valuesKey] === value);

    return result[props.column.valuesLabel];
  };

  const getValue = (value) => {
    if (Array.isArray(props.value[value])) {
      const strings = props.value[value].map(v => {
        if (props.column.valuesKey && props.column.valuesLabel) {
          return getLabel(v);
        }

        return props.intl.messages[v] || v;
      });

      return strings.join(', ');
    }

    if (props.column.valuesKey && props.column.valuesLabel) {
      return getLabel(value);
    }

    return props.intl.messages[props.value[value]] || props.value[value];
  };

  const getDate = (value) => {
    return moment(props.value[value]).format('DD-MM-YYYY');
  };

  const getDateRange = (values) => {
    const from =  moment(props.value[values[0]]).format('DD-MM-YYYY');
    const to =  moment(props.value[values[1]]).format('DD-MM-YYYY');

    return `${from} - ${to}`;
  };

  if (values.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: 'inline-block',
        marginLeft: 12,
      }}
    >
      <Button
        variant={theme === 'dark' ? 'outlined' : 'contained'}
        style={theme === 'dark' ? buttonStyleGreen : buttonStyleGreenLight}
        endIcon={<FontAwesomeIcon icon={'fa-square-minus'} />}
        onClick={() => handleButtonClick(props.column.key)}
        disableElevation={Boolean(theme === 'light')}
      >
        <strong>{props.intl.messages[props.column.label]}</strong>
        {values.length === 1 && (
          <span
            style={{
              color: '#9da5b4',
              marginLeft: 4,
              marginRight: 4,
            }}
          >
            {props.intl.messages[translateOperator(values[0])]}
          </span>
        )}
        {values.length === 2 && (
          <span
            style={{
              color: '#9da5b4',
              marginLeft: 4,
              marginRight: 4,
            }}
          >
            è tra i valori
          </span>
        )}
        {props.column.type === 'date' && values.length === 1 && (
          <strong>{getDate(values[0])}</strong>
        )}
        {props.column.type === 'date' && values.length === 2 && (
          <strong>{getDateRange(values)}</strong>
        )}
        {props.column.type !== 'date' && (
          <strong>{getValue(values[0])}</strong>
        )}
      </Button>
    </div>
  );
}

function FilterItem(props) {
  const getColumn = (key) => {
    const column = props.columns.find(c => c.alias === key || c.key === key);

    if (column) {
      return column;
    }

    return {};
  };

  const handleClick = (key) => {
    const column = props.columns.find(c => c.alias === key || c.key === key);

    if ('alias' in column) {
      props.onRemoveKey(column.alias);
    } else {
      props.onRemoveKey(column.key);
    }
  };

  return (
    <div className={'button-filter'}>
      {Object.entries(props.filters).map(([key, value]) => (
        <Item
          key={key}
          value={value}
          column={getColumn(key)}
          intl={props.intl}
          onClick={(key) => handleClick(key)}
        />
      ))}
    </div>
  );
}

export default injectIntl(FilterItem);
