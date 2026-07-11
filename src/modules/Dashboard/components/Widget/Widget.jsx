import React, { useCallback, useLayoutEffect, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Widget(props) {
  const [timestamp, setTimestamp] = useState(props.timestamp);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [element, setElement] = useState(null);
  const isUnlocked = useSelector(state => state.app.editDashboard);
  const theme = useSelector(state => state.app.theme);

  const widget = useCallback(element => {
    if (element !== null) {
      setElement(element);
    }
  }, []);

  const darkMode = {
    content: {
      backgroundColor: 'rgba(0,0,0,.3)',
      border: '1px solid rgba(0,0,0,.5)',
      boxShadow: '0 0 13px rgba(0,0,0,.22)',
    },
    title: {
      color: '#ffffff',
      backgroundColor: '#2F333D',
    },
    footer: {
      backgroundColor: '#2F333D',
      color: '#ffffff',
    }
  };

  const lightMode = {
    content: {
      backgroundColor: 'rgba(255,255,255,.3)',
      border: '1px solid rgba(83,92,126,.5)',
      boxShadow: '0 0 13px rgba(255,255,255,.22)',
    },
    title: {
      color: '#ffffff',
      backgroundColor: '#535c7e',
    },
    footer: {
      backgroundColor: '#535c7e',
      color: '#ffffff',
    }
  };

  useEffect(() => {
    setTimestamp(props.timestamp);

    if (element) {
      setWidth(element.getBoundingClientRect().width);
      setHeight(element.getBoundingClientRect().height);
    }
  }, [props]);

  useLayoutEffect(() => {
    if (element) {
      const size = () => {
        setWidth(element.getBoundingClientRect().width);
        setHeight(element.getBoundingClientRect().height);
      }

      size();

      window.addEventListener('resize', size);

      return () => {
        window.removeEventListener('resize', size);
      };
    }
  }, [element]);

  const lifecycleTime = () => {
    return new Date().getTime() - props.timestamp;
  };

  return (
    <div
      ref={widget}
      style={(theme === 'dark') ? darkMode.content : lightMode.content}
      className={'dashboard__widget__content'}
    >
      {props.children}
      <div
        style={(theme === 'dark') ? darkMode.title : lightMode.title}
        className={'dashboard__widget__title'}
      >
        {props.widgetTitle}
        {isUnlocked &&
          <div
            className={'dashboard__widget__toolbar'}
          >
            <div
              className={[
                'dashboard__widget__toolbar__button',
                'dashboard__widget__toolbar__button--red',
              ].join(' ')}
            >
              <FontAwesomeIcon
                icon={'times-circle'}
              />
            </div>
          </div>
        }
      </div>
      <div
        style={(theme === 'dark') ? darkMode.footer : lightMode.footer}
        className={'dashboard__widget__footer'}
      >
        <span>
          Lifecycle time: {lifecycleTime()}ms
        </span>
        <span
          className={'dashboard__widget__footer__resolution'}
        >
          Size: {width}x{height}
        </span>
      </div>
    </div>
  );
}
