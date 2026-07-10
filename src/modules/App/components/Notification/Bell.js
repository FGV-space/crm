import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchNotificationsCount, toggleNotificationArea} from '../../appSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import io from 'socket.io-client';

const API_URL = process.env.SOCKET_IO;
const socket = io(API_URL, { withCredentials: true });

export default function Bell() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const count = useSelector(state => state.app.notificationCount);
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    dispatch(fetchNotificationsCount(user.username));
  }, [dispatch]);

  useEffect(() => {
    socket.on('toNotification', (data) => {
      if (
        data.notification.username === user.username &&
        data.type === 'addNotification'
      ) {
        setIsActive(true);
      }
    });

    return () => {
      socket.off('toNotification');
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => {
        setIsActive(false);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [isActive])

  return (
    <div
      className={'button'}
      onClick={(element) => {
        element.preventDefault();
        dispatch(toggleNotificationArea());
      }}
      title={'Toggle notification area'}
    >
      <FontAwesomeIcon
        className={isActive ? 'bell' : ''}
        icon={'bell'}
        size={'lg'}
      />
      <span className={[
          'counter',
          (count > 0) ? 'notification-count' : ''
        ].join(' ')}
      >
        {count}
      </span>
    </div>
  );
}
