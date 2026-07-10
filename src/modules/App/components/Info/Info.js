import React from 'react';
import { useSelector } from "react-redux";

export default function Info() {
  const user = useSelector(state => state.user.data);
  const navigatorLang = navigator.language || navigator.userLanguage;
  const navigatorAgent = navigator.userAgent;

  return (
    <div className={'sidebar__user'}>
      <div className={'user-info'}>
        <div>
          <div className={'user-name'}>
            {user.name} {user.surname}
          </div>
          <div className={'user-email'}>
            {user.email}
          </div>
          <div className={'navigator-lang'}>
            Browser lang {navigatorLang}
          </div>
          <div className={'navigator-agent'}>
            {navigatorAgent}
          </div>
        </div>
      </div>
    </div>
  );
}
