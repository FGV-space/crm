import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Info from "../Info/Info";
import { FormattedMessage } from "react-intl";
import { toggleSubmenu } from "../../appSlice";
import { styled } from '@mui/material/styles';

const Container = styled('aside')(({ theme }) => ({
  backgroundColor: theme.palette.aside.backgroundColor,
}));

export default function Sidebar() {
  const dispatch = useDispatch();
  const showMenu = useSelector(state => state.app.showMenu);
  const menuItems = useSelector(state => state.app.menu);
  const user = useSelector(state => state.user.data);

  const getMenuItems = () => {
    return menuItems
      .filter(i => i.permission === 'everyone' || user.roles.includes(i.permission));
  }

  const renderMenuItem = (item, key) => {
    return (
      <li
        key={`menu-item.${key}`}
        className={['sidebar__item', item.active ? 'active' : ''].join(' ')}
      >
        <NavLink
          to={item.url}
          className={'sidebar__item__link'}
        >
        <span
          className={'sidebar__item__link__icon-container'}
        >
          <FontAwesomeIcon
              icon={item.icon}
              className={['sidebar__item__link__icon-container__icon', (item.duotone) ? 'duotone' : ''].join(' ')}
          />
        </span>
          <FormattedMessage
            id={item.title}
            defaultMessage={item.title}
          />
        </NavLink>
      </li>
    );
  };

  const renderSubmenuItems = (item, key) => {
    const content = item
      .filter(i => i.permission === 'everyone' || user.roles.includes(i.permission));

    return (
      <ul>
        {content.map((sub, index) => (
          <li
              key={`subitem-${key}-${index}`}
              className={['sidebar__item', 'sidebar__item--submenu'].join(' ')}
          >
            <NavLink
              className={['sidebar__item__link'].join(' ')}
              to={sub.url}
            >
              <FormattedMessage id={sub.title} />
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  const renderSubmenuItem = (item, key) => {
    return (
      <li
        key={`menu-item.${key}`}
        className={['sidebar__item', 'sidebar__item--submenu'].join(' ')}
      >
        <NavLink
          className={['sidebar__item__link'].join(' ')}
          to={'/nopage'}
          onClick={(element) => {
            element.preventDefault();
            dispatch(toggleSubmenu(item.title))
          }}
        >
          <span
              className={'sidebar__item__link__icon-container'}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={['sidebar__item__link__icon-container__icon', (item.duotone) ? 'duotone' : ''].join(' ')}
            />
          </span>
          <FormattedMessage
            id={item.title}
            defaultMessage={item.title}
          />
          {item.submenu &&
            <FontAwesomeIcon
              icon={'angle-right'}
              className={'sidebar__item__link__icon-angle'}
              rotation={item.toggled ? 90 : null}
            />
          }
        </NavLink>
        {item.toggled && renderSubmenuItems(item.submenu)}
      </li>
    );
  };

  return (
    <Container
      className={['sidebar', showMenu ? 'sidebar--show' : null].join(' ')}
    >
      <div className={'sidebar__wrapper'}>
        <nav className={'sidebar__body'}>
          <ul className={'sidebar__navigation'}>
            {getMenuItems().map((item, key) => (
              item.submenu ? renderSubmenuItem(item, key) : renderMenuItem(item, key)
            ))}
          </ul>
          <Info />
        </nav>
      </div>
    </Container>
  );
}
