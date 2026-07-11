import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchFilter } from '../../appSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { getModelLabelById } from '../../../../util/utils';
import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.searchResults.backgroundColor,
}));

export default function SearchResults({ searchText }) {
  const dispatch = useDispatch();
  const searchFilters = useSelector(state => state.app.searchFilters);
  const searchResults = useSelector(state => state.app.searchResults);
  const searchStatus = useSelector(state => state.app.searchStatus);

  const filterSelector = (item, index) => {
    return (
      <li
        className={[
          'search-results__filters__filter',
          item.selected
              ? 'search-results__filters__filter--selected'
              : null,
        ].join(' ')}
        key={`search-filter-${index}`}
        onClick={(element) => {
          element.preventDefault();
          dispatch(selectSearchFilter(item.label))
        }}
      >
        <FontAwesomeIcon
          icon={item.icon}
        />
        <span
          className={'search-results__filters__filter__label'}
        >
          {item.label}
        </span>
      </li>
    )
  };

  const highlightText = (value, key) => {
    const index = value.toLowerCase().indexOf(searchText.toLowerCase());

    if (index >= 0) {
      return [
        value.substring(0, index),
        <strong
          key={`hit-${key}`}
          className={'highlight-text'}
        >
          {value.substring(index, index + searchText.length)}
        </strong>,
        value.substring(index + searchText.length)
      ];
    }

    return value;
  };

  function sort(data) {
    return _.sortBy(data, ['description']);
  }

  const renderComponents = (item, key) => {
    return (
      <li
        key={`components-${key}`}
        className={'search-results__item__components'}
      >
        <ul>
          {(sort(item) || []).map((component, index) => (
            <li
              key={`component-${index}`}
              className={['dashed-list-item', 'search-results__item__components__component'].join(' ')}
            >
              <FontAwesomeIcon
                icon={component.icon}
                className={'margin-right-4'}
              />
              <NavLink
                to={`/${component.url}`}
              >
                {highlightText(component.description, key)}
              </NavLink>
              {('model' in component) &&
                <span className={['tag', 'tag--small', 'tag--pink'].join(' ')}>{getModelLabelById(component.model)}</span>
              }
            </li>
          ))}
        </ul>
      </li>
    );
  };

  const renderDatacenter = (item, key) => {
    return ([
      <li key={`datacenter-${key}`}>
        <FontAwesomeIcon
          icon={'building'}
          className={'margin-right-4'}
        />
        {highlightText(item.description, key)}
      </li>,
      ('components' in item && item.components.length > 0) && renderComponents(item.components, key)
    ]);
  };

  const renderActivityTracker = (item, key) => {
    return (
      <li key={`activity-tracker-${key}`}>
        <FontAwesomeIcon
          icon={'clipboard-list'}
          className={'margin-right-4'}
        />
        {highlightText(item.description, key)}
      </li>
    );
  };

  const renderSite = (item, key) => {
    return ([
      <li
        key={`site-${key}`}
      >
        <FontAwesomeIcon
          icon={'building'}
          className={'margin-right-4'}
        />
        <NavLink to={`/${item.url}`}>
          {highlightText(item.description, key)}
        </NavLink>
      </li>,
      ('components' in item && item.components.length > 0) && renderComponents(item.components, key)
    ]);
  };

  const renderSites = (item) => {
    const activity_tracker = item.filter(i => i._id && i.description === 'ActivityTracker');
    const datacenter = item.filter(i => i._id && i.description === 'Datacenter');
    const sites = item.filter(i => i._id && i.description !== 'Datacenter' && i.description !== 'ActivityTracker');

    return (
      <li className={'search-results__item__sites'}>
        <ul>
          {(sort(activity_tracker) || []).map((i, key) => renderActivityTracker(i, key))}
          {(sort(datacenter) || []).map((i, key) => renderDatacenter(i, key))}
          {(sort(sites) || []).map((i, key) => renderSite(i, key))}
        </ul>
      </li>
    );
  };

  const renderAuthority = (item, key) => {
    return (
      <ul>
        <li>
          <FontAwesomeIcon
            icon={'city'}
            className={'margin-right-4'}
          />
          <NavLink to={`/${item.authority.url}`}>
            {highlightText(item.authority.description, key)}
          </NavLink>
        </li>
        {('sites' in item) && renderSites(item.sites)}
      </ul>
    )
  }

  return (
    <Container className={'search-results'}>
      <div className={'search-results__filters'}>
        <ul>
          {searchFilters.map((item, index) => filterSelector(item, index))}
        </ul>
      </div>
      <div className={'search-results__wrapper'}>
        <ul className={'search-results__wrapper__scroll'}>
          {searchStatus === 'loading' &&
            <li className={'loader'}>
              {_.times(32, i => <span key={i}></span>)}
            </li>
          }
          {searchResults.length > 0 &&
            searchResults.map((item, key) => (
              <li className={'search-results__item'} key={`search-result-${key}`}>
                {('authority' in item) && renderAuthority(item, key)}
              </li>
            ))
          }
          {searchText !== '' && searchResults.length === 0 &&
            <li className={'search-results__item--not-found'}>
              <FontAwesomeIcon icon={'face-frown'} className={'margin-right-4'} />
              <span>{`La ricerca della voce ${searchText} non ha prodotto risultati`}</span>
            </li>
          }
        </ul>
      </div>
    </Container>
  );
}
