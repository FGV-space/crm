import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {styled} from "@mui/material/styles";

const Container = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export default function Sitenav() {
  const sitenav = useSelector(state => state.app.sitenav);

  return (
    <header
        className={'sitenav'}
    >
      <div
        className={'sitenav__content'}
      >
        <NavLink
          className={'sitenav__content__home'}
          to={'/dashboard'}
        >
          <FontAwesomeIcon icon={'home'} />
        </NavLink>
        {sitenav.map((site, index) => (
          <span
            key={`site-${index}`}
            className={'sitenav__content__site'}
          >
            <Container>
              <FontAwesomeIcon icon={'angle-right'} />
            </Container>
            <NavLink
              className={'sitenav__content__site__link'}
              to={site.url}
            >
              {site.title}
            </NavLink>
          </span>
        ))}
      </div>
    </header>
  );
}
