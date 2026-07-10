import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Fullscreen() {
  const toggleFullscreen = async (element) => {
    element.preventDefault();

    const app = document.getElementById('body');
    const isFullScreen = document.fullscreenElement;

    if (isFullScreen) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
    } else {
      if (app.requestFullscreen) {
        await app.requestFullscreen();
      } else if (app.webkitRequestFullscreen) {
        await app.webkitRequestFullscreen();
      } else if (app.msRequestFullscreen) {
        await app.msRequestFullscreen();
      }
    }
  };

  return (
    <div
      className={'button'}
      title={'Toggle fullscreen'}
      onClick={toggleFullscreen}
    >
      <FontAwesomeIcon icon={'desktop'} />
    </div>
  );
}
