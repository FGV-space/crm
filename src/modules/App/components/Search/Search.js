import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showSearch, searchEngine, setSearchStatus } from '../../appSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchResults from "./SearchResults";

export default function Search() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const showResults = useSelector(state => state.app.showSearch);

  useEffect(() => {
    if (searchText !== '' && searchText.length >= 3) {
      const timeout = setTimeout(() => {
        dispatch(setSearchStatus('loading'));
        dispatch(searchEngine(searchText));
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [searchText]);

  const handleChange = async (element) => {
    setSearchText(element.target.value);
  };

  const showSearchResults = (element) => {
    element.preventDefault();
    dispatch(showSearch());
  };

  return (
    <div className={'header__search'}>
      <div className={'search'}>
        <input
          className={'search__input'}
          type={'search'}
          name={'search'}
          onChange={(element) => handleChange(element)}
          onFocus={(element) => showSearchResults(element)}
          onBlur={(element) => showSearchResults(element)}
          autoComplete={'off'}
          value={searchText}
          spellCheck={'false'}
          role={'search'}
        />
        <FontAwesomeIcon
          icon={['fab', 'searchengin']}
          className={'search__helper'}
        />
      </div>
      {showResults &&
        <SearchResults searchText={searchText} />
      }
    </div>
  );
}
