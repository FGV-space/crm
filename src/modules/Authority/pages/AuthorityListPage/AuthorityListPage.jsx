import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setSitenav } from '../../../App/appSlice';
import { injectIntl } from 'react-intl';

function AuthorityListPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(props.intl.messages.authorities));
    dispatch(setSitenav([
      { url: '/authority', title: props.intl.messages.authorities }]))
  }, []);

  return (
    <div>Authority List Page</div>
  );
}

export default injectIntl(AuthorityListPage);
