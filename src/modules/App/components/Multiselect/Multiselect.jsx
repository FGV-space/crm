import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { injectIntl } from 'react-intl';
import { getLabelFromValues } from '../../../../util/utils';
import { styled } from '@mui/material/styles';

const MultiselectContainer = styled('div')(({ theme }) => ({
  color: theme.palette.pre.color,
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
  '.options': {
    backgroundColor: theme.palette.pre.backgroundColor,
    border: theme.palette.pre.border,
  },
}));

function Multiselect(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = (option) => {
    const isSelected = selectedOptions.includes(option);
    const options = (isSelected)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(options);
    props.onChange(options);
  };

  const handleOutsideClick = (event) => {
    if (event.target.closest('.multiselect')) return;
    setIsOpen(false);
  };

  const getLabel = (option) => {
    const result = props.options.find(o => o[props.valuesKey] === option);

    return result[props.valuesLabel];
  };

  const SelectedOptions = () => {
    if (selectedOptions.length === 0) {
      return <div className="placeholder">Seleziona opzioni</div>;
    }

    if (props.valuesKey && props.valuesLabel) {
      return selectedOptions.map((option) => (
        <div key={option} className="selected-option">
          <span>{getLabel(option)}</span>
        </div>
      ));
    }

    return selectedOptions.map((option) => (
      <div key={option} className="selected-option">
        <span>{props.intl.messages[option] || option}</span>
      </div>
    ));
  };

  const Options = () => {
    if (!isOpen) return null;

    if (props.valuesKey && props.valuesLabel) {
      return props.options.map((option) => (
        <div
          key={option[props.valuesKey]}
          className={`option ${selectedOptions.includes(option[props.valuesKey]) ? 'selected' : ''}`}
          onClick={() => toggleOption(option[props.valuesKey])}
        >
        <span className={'icon'}>
          <FontAwesomeIcon
            icon={['fa-regular', selectedOptions.includes(option[props.valuesKey]) ? 'fa-check-square' : 'fa-square'].join(' ')}
          />
        </span>
          {props.intl.messages[option[props.valuesLabel]] || option[props.valuesLabel]}
        </div>
      ));
    }

    return props.options.map((option) => (
      <div
        key={option}
        className={`option ${selectedOptions.includes(option) ? 'selected' : ''}`}
        onClick={() => toggleOption(option)}
      >
        <span className={'icon'}>
          <FontAwesomeIcon
            icon={['fa-regular', selectedOptions.includes(option) ? 'fa-check-square' : 'fa-square'].join(' ')}
          />
        </span>
        {props.intl.messages[option] || option}
      </div>
    ));
  };

  return (
    <MultiselectContainer className="multiselect">
      <div
        className="selected-options"
        onClick={toggleSelect}
      >
        <SelectedOptions />
        <span className={'multiselect-chevron'}>
          <FontAwesomeIcon
            icon={isOpen ? 'caret-up' : 'caret-down'}
          />
        </span>
      </div>
      {isOpen && (
        <div className={'options'}>
          <Options />
        </div>
      )}
    </MultiselectContainer>
  );
};

export default injectIntl(Multiselect);
