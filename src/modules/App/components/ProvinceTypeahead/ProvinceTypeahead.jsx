import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { client } from '../../../../util/apiCaller';
import _ from 'lodash';
import { capitalizeName } from '../../../../util/utils';

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

class Province {
  constructor(data) {
    this.codIstat = '';
    this.abbreviation = '';
    this.province = '';
    this.area = 0;
    this.residents = 0;
    this.municipialities = '';
    this.idRegion = 0;
    this.region = '';
  }

  static fromCity(city) {
    const data = {
      abbreviation: city.ctprov,
      province: city.pvdescri,
      region: city.rsdescri,
    }
    const province = new Province(data);
    Object.assign(province, data);
    return province;
  }
}

function ProvinceTypeahead(props) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (props.defaultValue) {
      if ('pvdescri' in props.defaultValue) {
        setValue(Province.fromCity(props.defaultValue));
      } else {
        setValue(props.defaultValue);
      }
    }
  }, [props.defaultValue]);

  const fetchData = async (search) => {
    const response = await client.get(`cities/provinces/search/${search}`);
    const { data } = response.data;

    if (data.length === 0) {
      data.push(new Province());
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

  const handleOnChange = (event, value) => {
    setValue(value);
    props.onChange(value);
  };

  const getOptionLabel = (option) => {
    if (option.province) {
      return `${capitalizeName(option.province)} - ${option.region}`;
    }
    return '';
  };

  const isOptionEqualToValue = (option, item) => {
    const defaultValue = new Province();

    return _.isEqual(option, item) || _.isEqual(option, defaultValue);
  }

  return (
    <StyledAutocomplete
      disablePortal
      id="province-typeahead"
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
  )
}

export default ProvinceTypeahead;
