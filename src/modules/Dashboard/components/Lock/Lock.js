import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleDashboard } from '../../../App/appSlice';

export default function Lock() {
  const dispatch = useDispatch();
  const isUnlocked = useSelector(state => state.app.editDashboard);

  return (
    <div
      className={'button'}
      title={isUnlocked ? 'Blocca dashboard' : 'Modifica dashboard'}
      onClick={(element) => {
        element.preventDefault();
        dispatch(toggleDashboard());
      }}
    >
      <FontAwesomeIcon icon={isUnlocked ? 'lock-open' : 'lock'} />
    </div>
  );
}
