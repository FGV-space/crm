import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, notificationMarkAsRead, toggleNotification } from '../../appSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { styled } from '@mui/material/styles';

const Container = styled('aside')(({ theme }) => ({
  backgroundColor: theme.palette.aside.backgroundColor,
}));

export default function Notification() {
  const dispatch = useDispatch();
  const showNotification = useSelector(state => state.app.showNotifications);
  const notifications = useSelector(state => state.app.notifications);
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    dispatch(fetchNotifications({
      filters: {
        username: user.username
      },
      limit: 12,
    }))
  }, [dispatch]);

  const markNotificationsAsRead = async (element) => {
    element.preventDefault();

    try {
      await dispatch(notificationMarkAsRead(user.username));
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleNotification = async (element, notification) => {
    element.preventDefault();

    try {
      await dispatch(toggleNotification({
        id: notification._id,
        read: !notification.read,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const renderNotification = (notification, key) => {
    return (
      <li
        key={`notification-${key}`}
        className={[
          'notification__item',
          notification.read
            ? ''
            : 'notification__item--to-read',
        ].join(' ')}
        onClick={(element) => handleToggleNotification(element, notification)}
      >
        <span
          className={'notification__item__icon'}
        >
          <FontAwesomeIcon
            icon={notification.icon}
          />
        </span>
        <span
          className={'notification__item__message'}
        >
          <FormattedMessage
            id={notification.messageId}
            values={notification.values}
          />
        </span>
        <span
          className={'notification__item__link'}
        >
          <NavLink to={`/${notification.url}`}>
            <FormattedMessage id={'showDetail'} />
          </NavLink>
        </span>
        <span
          className={'notification__item__date'}
        >
          {moment(notification.date).calendar()}
        </span>
      </li>
    );
  };

  return (
    <Container
      className={['notification', showNotification ? 'notification--show' : null].join(' ')}
    >
      <div className={'notification__wrapper'}>
        <div className={'notification__header'}>
          <div className={'notification__header__container'}>
            <span className={'notification__header__title'}>
              Notifiche
            </span>
          </div>
          <div className={['button', 'button--circle', 'margin-right-4'].join(' ')}>
            <NavLink
              to={'/notification'}
            >
              <FontAwesomeIcon icon={'list-ul'} />
            </NavLink>
          </div>
          <div className={['button', 'button--circle'].join(' ')}>
            <NavLink
              to={'#'}
              title={'Segna come lette'}
              onClick={markNotificationsAsRead}
            >
              <FontAwesomeIcon icon={'glasses'} />
            </NavLink>
          </div>
        </div>
        <div className={'notification__body'}>
          <div className={'notification__body__scroll'}>
            <ul>
              {notifications.map((notification, key) => (
                renderNotification(notification, key)
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
