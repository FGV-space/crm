import React, {useState} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import { useSelector } from 'react-redux';
import {
  buttonStyleOrange,
  buttonStyleOrangeLight,
  buttonStylePink,
  buttonStylePinkLight
} from '../../../../util/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button, Stack} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Input } from '../Input/Input';
import moment from 'moment';
import Date from '../Date/Date';
import Multiselect from '../Multiselect/Multiselect';

const ButtonFilterOptions = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.buttonFilterOptions.backgroundColor,
  border: theme.palette.buttonFilterOptions.border,
  ul: {
    li: {
      '&.selected': {
        color: theme.palette.primary.main,
      },
      '&.unselected': {
        color: theme.palette.secondary.main,
      },
      '&:hover': {
        backgroundColor: theme.palette.buttonFilterOptions.backgroundColorHover,
      }
    }
  }
}));

const ButtonFilterContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.buttonFilterOptions.backgroundColor,
  borderLeft: theme.palette.buttonFilterOptions.border,
  ul: {
    li: {
      '&.selected': {
        color: theme.palette.primary.main,
      },
      '&.unselected': {
        color: theme.palette.secondary.main,
      },
      '&:hover': {
        backgroundColor: theme.palette.buttonFilterOptions.backgroundColorHover,
      }
    }
  }
}));

const OptionContainer = styled('div')(({ theme }) => ({
  '&.selected': {
    color: theme.palette.primary.main,
  },
  '&.unselected': {
    color: theme.palette.secondary.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.buttonFilterOptions.backgroundColorHover,
  }
}));

const Option = ({ isSelected, label, onClick }) => {
  return (
    <OptionContainer
      onClick={onClick}
      className={isSelected ? 'selected' : 'unselected'}
      style={{
        cursor: 'pointer',
        padding: '8px 16px',
      }}
    >
        <span
          style={{
            marginRight: 8,
          }}
        >
          <FontAwesomeIcon
            icon={['fa-regular', isSelected ? 'fa-circle-dot' : 'fa-circle'].join(' ')}
          />
        </span>
      <FormattedMessage id={label} />
    </OptionContainer>
  );
};

const InputText = ({ onChange }) => {
  const [value, setValue] = useState('');

  const handleOnChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={"filter-element"}>
      <Input
        className={'pre'}
        type="text"
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

const InputNumber = ({ onChange }) => {
  const [value, setValue] = useState('');

  const handleOnChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={"filter-element"}>
      <Input
        className={'pre'}
        type="number"
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

const FilterText = ({ onChange }) => {
  const [operator, setOperator] = useState('isEqual');
  const [value, setValue] = useState('');
  const operators = ['isEqual', 'isNotEqual', 'contains', 'startWith', 'endsWith'];

  const dispatchOnChange = (opt, val) => {
    switch (opt) {
      case 'isEqual':
        onChange({ regexEq: val });
        break;
      case 'isNotEqual':
        onChange({ regexNe: val });
        break;
      case 'contains':
        onChange({ regexLike: val });
        break;
      case 'startWith':
        onChange({ regexStart: val });
        break;
      case 'endsWith':
        onChange({ regexEnds: val });
        break;
      default:
        onChange(val);
        break;
    }
  };

  const handleChangeOperator = (opt) => {
    const newOperator = opt;
    setOperator(newOperator);
    dispatchOnChange(newOperator, value);
  };

  return (
    <div className={"filter-element"}>
      {operators.map((o, i) => [
        <Option
          key={`option-${i}`}
          onClick={() => handleChangeOperator(o)}
          isSelected={operator === o}
          label={o}
        />,
        (operator === o && (
          <InputText
            key={`input-${i}`}
            onChange={(newValue) => dispatchOnChange(o, newValue)}
          />
        ))
      ])}
    </div>
  );
};

const FilterNumber = ({ onChange }) => {
  const [operator, setOperator] = useState('isEqual');
  const [value, setValue] = useState('');
  const [range, setRange] = useState({ $gt: '', $lt: '' })
  const operators = ['isEqual', 'isNotEqual', 'isBetween', 'isGreaterThan', 'isLessThan'];

  const dispatchOnChange = (opt, val) => {
    switch (opt) {
      case 'isEqual':
        onChange({ $eq: val });
        break;
      case 'isNotEqual':
        onChange({ $ne: val });
        break;
      case 'isGreaterThan':
        onChange({ $gt: val });
        break;
      case 'isLessThan':
        onChange({ $lt: val });
        break;
      default:
        onChange(val);
        break;
    }
  };

  const handleChangeOperator = (opt) => {
    const newOperator = opt;
    setOperator(opt);
    dispatchOnChange(opt, ('isBetween') ? range  : value);
  };

  const handleRangeOnChange = (newValue, key) => {
    const newRange = { ...range };
    newRange[key] = newValue;
    setRange(newRange);
    dispatchOnChange(operator, newRange);
  };

  return (
    <div className={"filter-element"}>
      {operators.map((o, i) => [
        <Option
          key={`option-${i}`}
          onClick={() => handleChangeOperator(o)}
          isSelected={operator === o}
          label={o}
        />,
        (o !== 'isBetween' && operator === o && (
          <InputNumber
            key={`input-${i}`}
            onChange={(newValue) => dispatchOnChange(o, newValue)}
          />
        )),
        (o === 'isBetween' && operator === o && (
          <div key={`range-${i}`}>
            <InputNumber
              onChange={(newValue) => handleRangeOnChange(newValue, '$gt')}
            />
            <span>e</span>
            <InputNumber
              onChange={(newValue) => handleRangeOnChange(newValue, '$lt')}
            />
          </div>
        ))
      ])}
    </div>
  );
};

const FilterDate = ({ onChange }) => {
  const [operator, setOperator] = useState('isEqual');
  const [value, setValue] = useState(moment().startOf('day'));
  const [range, setRange] = useState({ $gt: moment().startOf('day'), $lt: moment().add(1, 'd').startOf('day') })
  const operators = ['isEqual', 'isNotEqual', 'isBetween', 'isGreaterThan', 'isLessThan'];

  const dispatchOnChange = (opt, val) => {
    switch (opt) {
      case 'isEqual':
        onChange({ $eq: val });
        break;
      case 'isNotEqual':
        onChange({ $ne: val });
        break;
      case 'isGreaterThan':
        onChange({ $gt: val });
        break;
      case 'isLessThan':
        onChange({ $lt: val });
        break;
      default:
        onChange(val);
        break;
    }
  };

  const handleOnChange = (date) => {
    setValue(date);
    dispatchOnChange(operator, date);
  };

  const handleChangeOperator = (opt) => {
    const newOperator = opt;
    setOperator(opt);
    dispatchOnChange(opt, ('isBetween') ? range  : value);
  };

  const handleRangeOnChange = (newValue, key) => {
    const newRange = { ...range };
    newRange[key] = newValue;
    setRange(newRange);
    dispatchOnChange(operator, newRange);
  };

  return (
    <div
      style={{
        padding: '8px 16px',
        border: 'none',
      }}
    >
      {operators.map((o, i) => [
        <Option
          key={`option-${i}`}
          onClick={() => handleChangeOperator(o)}
          isSelected={operator === o}
          label={o}
        />,
        (o !== 'isBetween' && operator === o && (
          <Date
            key={`date-${i}`}
            value={value}
            onChange={handleOnChange}
          />
        )),
        (o === 'isBetween' && operator === o && (
          <div key={`range-${i}`}>
            <Date
              value={range.$gt}
              onChange={(date) => handleRangeOnChange(date, '$gt')}
            />
            <span>e</span>
            <Date
              value={range.$lt}
              onChange={(date) => handleRangeOnChange(date, '$lt')}
            />
          </div>
        ))
      ])}
    </div>
  );
};

const FilterMultiselect = ({ onChange, options, valuesKey, valuesLabel }) => {
  const [operator, setOperator] = useState('contains');
  const [values, setValues] = useState([]);
  const operators = ['contains', 'doesNotContain'];

  const handleOnChange = (val) => {
    setValues(val);
    dispatchOnChange(operator, val);
  };

  const dispatchOnChange = (opt, val) => {
    switch (opt) {
      case 'contains':
        onChange({ $in: val });
        break;

      case 'doesNotContain':
        onChange({ $nin: val });
        break;

      default:
        onChange(val);
        break;
    }
  };

  const handleChangeOperator = (opt) => {
    setOperator(opt);
    dispatchOnChange(opt, values);
  };

  return (
    <div className={"filter-element"}>
      {operators.map((o, i) => [
        <Option
          key={`option-${i}`}
          onClick={() => handleChangeOperator(o)}
          isSelected={operator === o}
          label={o}
        />,
        (operator === o && (
          <Multiselect
            key={`multiselect-${i}`}
            options={options}
            onChange={handleOnChange}
            valuesKey={valuesKey || false}
            valuesLabel={valuesLabel || false}
          />
        )),
      ])}
    </div>
  );
}

function FilterMenu({ columns, onApply, intl }){
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [query, setQuery] = useState({});
  const users = useSelector(state => state.user.users);
  const user = useSelector(state => state.user.data);
  const theme = useSelector(state => state.app.theme);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleUndoClick = () => {
    setShowOptions(false);
  };

  const handleApplyClick = () => {
    setShowOptions(false);

    if ('alias' in selectedOption) {
      onApply({ [selectedOption.alias]: query });
    } else {
      onApply({ [selectedOption.key]: query });
    }
  };

  const handleQueryOnChange = (query) => {
    setQuery(query);
  };

  const getUsers = () => {
    const { rbac } = columns.find(c => c.key === selectedOption.key);
    const usersValues = (rbac && !user?.roles.includes(rbac))
      ? [user.username]
      : users.map(u => u.username);

    return usersValues;
  };

  const getOptions = () => {
    const column = columns.find(c => c.key === selectedOption.key);

    return (column) ? column.values : [];
  };

  const getValuesKey = () => {
    const column = columns.find(c => c.key === selectedOption.key);

    return (column) ? column.valuesKey : false;
  };

  const getValuesLabel = () => {
    const column = columns.find(c => c.key === selectedOption.key);

    return (column) ? column.valuesLabel : false;
  };

  return (
    <div
      className={'button-filter'}
    >
      <Button
        variant={theme === 'dark' ? 'outlined' : 'contained'}
        style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
        endIcon={<FontAwesomeIcon icon={'fa-square-plus'} />}
        onClick={() => setShowOptions(!showOptions)}
        disableElevation={Boolean(theme === 'light')}
      >
        Aggiungi filtro
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
                key={`option-${index}`}
                onClick={() => setSelectedOption(column)}
                className={(column.key === selectedOption.key) ? 'selected' : 'unselected'}
              >
                <span
                  style={{
                    marginRight: 8,
                  }}
                >
                  <FontAwesomeIcon
                    icon={['fa-regular', (column.key === selectedOption.key) ? 'fa-circle-dot' : 'fa-circle'].join(' ')}
                  />
                </span>
                <span>
                  {intl.messages[column.label] || column.label}
                </span>
              </li>
            ))}
          </ul>
          {selectedOption?.key && (
            <ButtonFilterContainer
              className={'button-filter-container'}
            >
              {selectedOption.type === 'text' && <FilterText onChange={handleQueryOnChange} />}
              {selectedOption.type === 'number' && <FilterNumber onChange={handleQueryOnChange} />}
              {selectedOption.type === 'date' && <FilterDate onChange={handleQueryOnChange} />}
              {selectedOption.type === 'users' && <FilterMultiselect onChange={handleQueryOnChange} options={getUsers()} />}
              {selectedOption.type === 'multiselect' && (
                <FilterMultiselect
                  onChange={handleQueryOnChange}
                  options={getOptions()}
                  valuesKey={getValuesKey()}
                  valuesLabel={getValuesLabel()}
                />
              )}
              <div
                style={{
                  padding: '8px 16px',
                }}
              >
                <Stack spacing={2} direction="row">
                  <Button
                    onClick={handleUndoClick}
                    variant={theme === 'dark' ? 'outlined' : 'contained'}
                    style={theme === 'dark' ? buttonStyleOrange : buttonStyleOrangeLight}
                    startIcon={<FontAwesomeIcon icon={'fa-xmark'} />}
                    disableElevation={Boolean(theme === 'light')}
                  >
                    {intl.messages.undo}
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'outlined' : 'contained'}
                    style={theme === 'dark' ? buttonStylePink : buttonStylePinkLight}
                    onClick={handleApplyClick}
                    startIcon={<FontAwesomeIcon icon={'fa-check'} />}
                    disableElevation={Boolean(theme === 'light')}
                  >
                    {intl.messages.apply}
                  </Button>
                </Stack>
              </div>
            </ButtonFilterContainer>
          )}
        </ButtonFilterOptions>
      )}
    </div>
  );
}

export default injectIntl(FilterMenu);
