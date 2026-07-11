import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './App/components/Header/Header';
import Sidebar from './App/components/Sidebar/Sidebar';
import Notification from './App/components/Notification/Notification';
import Overlay from './App/components/Overlay/Overlay';
import Cookies from 'universal-cookie';
import { setData } from './User/userSlice';
import { history } from "../util/history";
import Sitenav from "./App/components/Sitenav/Sitenav";
import io from 'socket.io-client';
import {fetchWeather} from "./Dashboard/dashboardSlice";
import { ThemeProvider, styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { dark } from './App/themes/darkTheme';
import { light } from './App/themes/lightTheme';

const API_URL = import.meta.env.SOCKET_IO;
const socket = io(API_URL, { withCredentials: true });

const StyledHeader = styled(Header)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const Layout = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user.auth);
  const title = useSelector(state => state.app.title);
  const showNotification = useSelector(state => state.app.showNotifications);
  const theme = useSelector(state => state.app.theme);
  const hasCookie = (cookies.get('vms'));
  const data = localStorage.getItem('vms.user');

  if (hasCookie && !isAuth) {
    dispatch(setData({ user: JSON.parse(data) }));
  } else if ((!hasCookie && !isAuth) || !data) {
    return (
      <Navigate
        to={'/login'}
        state={{ from: history.location }}
      />
    );
  }

  useEffect(() => {
    socket.on('welcome', (data) => {
      console.log(data);
    });

    return () => {
      socket.off('welcome');
    };
  }, []);

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light }>
      <CssBaseline />
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isAuth && [
        <Sidebar key={'sidebar'} />,
        <StyledHeader key={'header'} />
      ]}
      {isAuth && showNotification &&
        <Notification key={'notification'} />
      }
      <Overlay />
      <div className={'content'}>
        {isAuth &&
          <Sitenav />
        }
        <Outlet />
      </div>
    </ThemeProvider>
  )
};

export default Layout;
