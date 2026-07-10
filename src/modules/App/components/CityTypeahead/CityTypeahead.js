import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Paper } from '@mui/material';
import { injectIntl} from 'react-intl';
import { client } from '../../../../util/apiCaller';
import { capitalizeCityLabel } from '../../../../util/utils';
import { styled } from '@mui/material/styles';
import _ from 'lodash';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiAutocomplete-inputRoot': {
    color: theme.palette.pre.color,
    backgroundColor: theme.palette.pre.backgroundColor,
    border: theme.palette.pre.border,
    borderRadius: 0
  },
  '& .MuiAutocomplete-clearIndicator': {
    color: theme.palette.pre.color,
  },
  '& .MuiAutocomplete-popupIndicator': {
    color: theme.palette.pre.color,
  },
  '& .MuiAutocomplete-option': {
    color: theme.palette.pre.color,
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  color: theme.palette.pre.color,
  backgroundColor: theme.palette.pre.backgroundColor,
  border: theme.palette.pre.border,
}));

function CityTypeahead(props) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (props.defaultValue && props.defaultValue.ctlocal) {
      setValue(props.defaultValue);
    }
  }, [props.defaultValue]);

  const fetchData = async (search) => {
    const response = await client.get(`infinity/city/${search}`);
    const { data } = response.data;

    if (data.length === 0) {
      data.push({
        ctlocal: search,
        ctprov: '',
        ctcap: '',
        pvdescri: '',
        rsdescri: '',
      });
    }

    setOptions(data);
  }

  const handleSearch = (event) => {
    if (event) {
      const search = event.target.value;
      setInputValue(search);

      if (search !== '') {
        fetchData(search);
      }
    }
  };

  const handleOnChange = (event, option) => {
    setValue(option);
    props.onChange(option);
  };

  const isOptionEqualToValue = (option, item) => {
    const defaultValue = {
      ctlocal: 0,
      ctprov: '',
      ctcap: '',
      pvdescri: '',
      rsdescri: '',
    };

    return _.isEqual(option, item) || _.isEqual(option, defaultValue);
  };

  const getOptionLabel = (option) => {
    if (option.ctprov) {
      return `${capitalizeCityLabel(option.ctlocal)} (${option.ctprov})`
    } else if (option.city && option.province) {
      return `${capitalizeCityLabel(option.city)} (${option.province})`
    } else if (option.city) {
      return `${capitalizeCityLabel(option.city)}`
    }

    return `${capitalizeCityLabel(option.ctlocal)}`
  };

  return (
    <StyledAutocomplete
      disablePortal
      id="city-typeahead"
      options={options}
      value={value}
      noOptionsText="Nessun risultato"
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      sx={{ width: 300 }}
      PaperComponent={StyledPaper}
      renderInput={(params) => <TextField {...params} style={{ border: 'none' }} label="" />}
      onInputChange={handleSearch}
      onChange={handleOnChange}
    />
  );
}

export default injectIntl(CityTypeahead);
