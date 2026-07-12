import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleShowPassword, loginRequest, resetMessage } from '../userSlice';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '../../App/components/Input/Input';
import { ThemeProvider, styled } from '@mui/material/styles'
import { dark } from '../../App/themes/darkTheme';
import { light } from '../../App/themes/lightTheme';

import logo from '../../../images/vms.svg';
import { history } from '../../../util/history';
import ParticlesBackground from '../components/ParticlesBackground/ParticlesBackground';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const showPassword = useSelector(state => state.user.showPassword);
  const loginMessage = useSelector(state => state.user.message);
  const theme = useSelector(state => state.app.theme);
  const isAuth = useSelector(state => state.user.auth);
  const data = localStorage.getItem("vms.user");

  const onLogin = async (element) => {
    element.preventDefault();

    if (username && password) {
    localStorage.setItem(
        "vms.user",
        JSON.stringify({ username })
    );

    dispatch(loginSuccess());
}}

  const handleInputChange = (element) => {
    if (loginMessage) {
      dispatch(resetMessage());
    }

    if (element.target.name === 'username') {
      setUsername(element.target.value);
    } else if (element.target.name === 'password') {
      setPassword(element.target.value);
    }
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light }>
      <div className={'login'}>
        <ParticlesBackground />
        <div className={'login__content'}>
          <img
            src={logo}
            alt={'Velocar Management System'}
            className={'login__logo'}
          />
          <h2 className={'login__title'}>
            Sign in to your account
          </h2>
          <Input
            className={'login__input'}
            placeholder={'Username'}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                passwordInput.current.focus();
              }
            }}
            name={'username'}
            autoComplete={'off'}
          />
          <div className={'login__password'}>
            <Input
              className={'login__input'}
              placeholder={'Password'}
              onChange={handleInputChange}
              onKeyDown={async (event) => {
                if (event.key === 'Enter') {
                  await onLogin(event)
                }
              }}
              name={'password'}
              type={showPassword ? 'text' : 'password'}
              autoComplete={'off'}
            />
            <button
                className={'login__password-button'}
              onClick={() => dispatch(toggleShowPassword())}
            >
              {
                (showPassword)
                  ? <FontAwesomeIcon icon={'eye'} />
                  : <FontAwesomeIcon icon={'eye-slash'} />
              }
            </button>
          </div>
          <a
            href={'#'}
            className={'login__submit'}
            onClick={onLogin}
          >
            Log in
          </a>
          <div
            className={['login__message', loginMessage ? 'fade-in' : 'fade-out'].join(' ')}
          >
            <strong>Errore: </strong>
            {loginMessage}
          </div>
          <div className={'login__payoff'}>
            <h2>Velocar Management System v.3.0.0</h2>
            <h2>&copy;2024 All Rights Reserved</h2>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
