import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closeAll } from "../../appSlice";

export default function Overlay() {
  const dispatch = useDispatch();
  const showOverlay = useSelector(state => state.app.showOverlay);

  if (showOverlay) {
    return (
      <div
        className={'overlay'}
        onClick={(element) => {
          element.preventDefault();
          dispatch(closeAll());
        }}
      >
        &nbsp;
      </div>
    );
  }

  return null;
}
