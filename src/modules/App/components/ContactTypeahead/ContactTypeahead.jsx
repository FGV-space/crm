import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Autocomplete, Button, Grid, Paper, Typography, debounce } from '@mui/material';
import { injectIntl} from 'react-intl';
import { client } from '../../../../util/apiCaller';
import { capitalizeName } from '../../../../util/utils';
import { styled } from '@mui/material/styles';

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

function ContactTypeahead(props) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.defaultValue);
    }
  }, [props.defaultValue]);

  const fetchData = async (search) => {
    const response = await client.get(`infinity/subject/contact/${search}`);
    const data = [...response.data];

    if (data.length === 0) {
      data.push({
        cotitle: search,
        phones: [],
        email: [],
      });
    }

    setOptions(data);
  };

  const handleSearch = (event) => {
    if (event) {
      const search = event.target.value;
      setInputValue(search);

      if (search !== '') {
        fetchData(search).then();
      }
    }
  };

  const handleOnChange = (event, option) => {
    setSelectedOption(option);
    props.onChange(option);
  };

  return (
    <StyledAutocomplete
      disablePortal
      id="contact-typeahead"
      options={options}
      value={value}
      noOptionsText={'Nessun risultato'}
      getOptionLabel={(option) => capitalizeName(option.cotitle)}
      sx={{ width: 300 }}
      PaperComponent={StyledPaper}
      renderInput={(params) => <TextField {...params} style={{ border: 'none' }} label="" />}
      onInputChange={handleSearch}
      onChange={handleOnChange}
    />
  );
}

export default injectIntl(ContactTypeahead);
