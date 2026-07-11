import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { switchTheme } from '../../appSlice';

function ThemeSwitch() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.app.theme);

  const handleToggleTheme = () => {
    dispatch(switchTheme());
  };

  return (
    <div className={'button'} title={'Switch theme'} onClick={handleToggleTheme}>
      <FontAwesomeIcon icon={(theme === 'light') ? 'sun' : 'moon'} />
    </div>
  );
}

export default ThemeSwitch;
