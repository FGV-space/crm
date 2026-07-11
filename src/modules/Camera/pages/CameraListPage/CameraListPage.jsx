import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTitle, setSitenav} from '../../../App/appSlice';
import { fetchCameras, fetchModels } from '../../cameraSlice';
import { injectIntl } from 'react-intl';
import Grid from '../../../App/components/Grid/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function CameraListPage(props) {
  const dispatch = useDispatch();
  const columns = useSelector(state => state.camera.columns);
  const models = useSelector(state => state.camera.models);
  const data = useSelector(state => state.camera.data);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCameras());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTitle(props.intl.messages.cameras));
    dispatch(setSitenav([
      { url: '/cameras', title: props.intl.messages.cameras }]))
  }, []);

  const stringAvatar = (string) => {
    const palette = [
      '#ff3e3e',
      '#4CD964',
      '#FF7F3F',
      '#FFE400',
      '#961EE1',
      '#1ECBE1',
    ];

    let children;
    let bgcolor;

    switch (string) {
      case 'WS-LANE-MODE-FREE-FLOW':
        children = 'FF';
        bgcolor = palette[1];
        break;

      case 'WS-LANE-MODE-SPEED':
        children = 'S';
        bgcolor = palette[2];
        break;

      case 'WS-LANE-MODE-RED':
        children = 'R';
        bgcolor = palette[3];
        break;

      case 'WS-LANE-MODE-RED-AND-FREE-FLOW':
        children = 'RF';
        bgcolor = palette[4];
        break;

      case 'WS-LANE-MODE-RED-AND-SPEED-ON-GREEN':
        children = 'RS';
        bgcolor = palette[5];
        break;

      default:
        children = '-';
        bgcolor = palette[0];
    }
    return {
      sx: {
        width: 24,
        height: 24,
        color: bgcolor,
        fontSize: '12px',
        fontFamily: 'Menlo,Consolas,DejaVu Sans Mono,monospace !important',
        bgcolor: 'transparent',
        border: `2px solid ${bgcolor}`
      },
      children,
    };
  };

  const renderRow = (value, column) => {
    switch (column.key) {
      case 'sn':
        return (
          <>
            <NavLink
              to={`/cameras/${value}`}
            >
              {value}
            </NavLink>
          </>
        )
      case 'model':
        const result = models.find(model => model._id === value) || { model: value };
        return result.model;
      case 'authority':
        return (
          <>
            <NavLink
              to={`/authority/${value._id}`}
            >
              {value.description}
            </NavLink>
          </>
        )
      case 'site':
        return (
          <>
            <NavLink
              to={`/authority/site/${value._id}`}
            >
              {value.description}
            </NavLink>
          </>
        )
      case 'licence':
        return (
          <>
            <FontAwesomeIcon
              size="xl"
              icon={'fa-duotone fa-microchip-ai'}
              className={value.makeAndModel ? 'color--green' : 'color--grey'}
            />
          </>
        )
      case 'configured':
        return (
          <>
            <FontAwesomeIcon
              size="xl"
              icon={'fa-duotone fa-gear-code'}
              className={value ? 'color--green' : 'color--grey'}
            />
          </>
        )
      case 'activated':
        return (
          <>
            <FontAwesomeIcon
              size="xl"
              icon={'fa-duotone fa-file-waveform'}
              className={value ? 'color--green' : 'color--grey'}
            />
          </>
        )
      case 'monitored':
        return (
          <>
            <FontAwesomeIcon
              size="xl"
              icon={'fa-duotone fa-monitor-waveform'}
              className={value ? 'color--green' : 'color--grey'}
            />
          </>
        )
      case 'installed':
        return (
          <>
            <FontAwesomeIcon
              size="xl"
              icon={'fa-duotone fa-flag'}
              className={value ? 'color--green' : 'color--grey'}
            />
          </>
        )
      case 'scrapped':
        return (
          <>
            <FontAwesomeIcon
              size="xl"
              icon={'fa-duotone fa-trash-can'}
              className={value ? 'color--red' : 'color--grey'}
            />
          </>
        )
      case 'lane1':
      case 'lane2':
      case 'lane3':
        return (
          <Stack>
            <Avatar {...stringAvatar(value)} />
          </Stack>
        )
      default:
        return JSON.stringify(value);
    }
  }

  return (
    <div>
      <Grid
        columns={columns}
        data={data}
        renderRow={renderRow}
      />
    </div>
  );
}

export default injectIntl(CameraListPage);
