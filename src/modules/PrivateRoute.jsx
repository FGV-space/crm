import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logOut, setData} from './User/userSlice'
import { history } from '../util/history';
import Cookies from 'universal-cookie';

export function PrivateRoute({ children }) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user.auth);
  const hasCookie = (cookies.get('vms'));

  if (!hasCookie && !isAuth) {
    return (
      <Navigate
        to={'/login'}
        state={{ from: history.location }}
      />
    );
  } else if (hasCookie && !isAuth) {
    const data = localStorage.getItem('vms.user');

    dispatch(setData({ user: JSON.parse(data) }));
  } else if (!hasCookie && isAuth) {
    console.log('Force log out...');
    dispatch(logOut());
  }

  return children;
}
