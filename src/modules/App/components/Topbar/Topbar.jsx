import React from 'react';
import Bell from '../Notification/Bell';
import Lock from '../../../Dashboard/components/Lock/Lock';
import Fullscreen from '../Fullscreen/Fullscreen';
import UserMenu from '../../../User/components/UserMenu/UserMenu';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

export default function Topbar() {
  return (
    <div className='topbar'>
      <ul>
        <li>
          <Bell />
        </li>
        <li>
          <Lock />
        </li>
        <li>
          <Fullscreen />
        </li>
        <li>
          <ThemeSwitch />
        </li>
        <li>
          <UserMenu />
        </li>
      </ul>
    </div>
  );
}
