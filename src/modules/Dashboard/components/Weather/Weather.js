import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../../dashboardSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from "react-intl";
import moment from "moment";
import io from 'socket.io-client';
import { styled } from '@mui/material/styles';

const API_URL = process.env.SOCKET_IO;
const socket = io(API_URL, { withCredentials: true });

function mts2kmh(mts) {
  return (mts * 3.60).toFixed(2);
}

function deg2card(deg) {
  const degree = 360 / 8;
  const angle = deg + degree / 2;

  if (angle >= 0 && angle < degree) return 'N';
  if (angle >= degree && angle < 2 * degree) return 'NE';
  if (angle >= 2 * degree && angle < 3 * degree) return 'E';
  if (angle >= 3 * degree && angle < 4 * degree) return 'SE';
  if (angle >= 4 * degree && angle < 5 * degree) return 'S';
  if (angle >= 5 * degree && angle < 6 * degree) return 'SO';
  if (angle >= 6 * degree && angle < 7 * degree) return 'O';
  if (angle >= 7 * degree && angle < 8 * degree) return 'NO';

  return 'N';
}

function hpa2bar(hpa) {
  return (hpa * 0.001).toFixed(4);
}

export default function Weather() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.dashboard.weather);

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch]);

  useEffect(() => {
    socket.on('ioWeather', (data) => {
      console.log(data);
      dispatch(fetchWeather())
    });

    return () => {
      socket.off('ioWeather');
    };
  }, [dispatch]);

  const renderIcon = (icon) => {
    const weatherIcon = {
      '01d': 'fa-duotone fa-sun',
      '01n': 'fa-duotone fa-moon',
      '02d': 'fa-duotone fa-cloud-sun',
      '02n': 'fa-duotone fa-cloud-moon',
      '03d': 'fa-duotone fa-cloud',
      '03n': 'fa-duotone fa-cloud',
      '04d': 'fa-duotone fa-cloud-meatball',
      '04n': 'fa-duotone fa-cloud-meatball',
      '09d': 'fa-duotone fa-cloud-rain',
      '09n': 'fa-duotone fa-cloud-rain',
      '10d': 'fa-duotone fa-cloud-sun-rain',
      '10n': 'fa-duotone fa-cloud-moon-rain',
      '11d': 'fa-duotone fa-poo-storm',
      '11n': 'fa-duotone fa-poo-storm',
      '13d': 'fa-duotone fa-snowflake',
      '13n': 'fa-duotone fa-snowflake',
      '50d': 'fa-duotone fa-smog',
      '50n': 'fa-duotone fa-smog',
    };

    return (
      <div
        className={'weather__icon'}
      >
        <FontAwesomeIcon icon={weatherIcon[icon]} />
      </div>
    );
  };

  const renderTemperatures = (temperatures) => {
    return (
      <div>
        <div
          className={'weather__main__temp'}
        >
          {`${Math.trunc(temperatures.temp)}°c`}
        </div>
        <div
          className={'weather__main__daily'}
        >
          <span
            className={'weather__main__daily--min'}
          >
            {`${Math.trunc(temperatures.temp_min)}`}
          </span>
          &divide;
          <span
            className={'weather__main__daily--max'}
          >
            {`${Math.trunc(temperatures.temp_max)}`}
          </span>
        </div>
      </div>
    );
  };

  const Container = styled('div')(({ theme }) => ({
    color: theme.palette.secondary.main,
  }));

  if (data?.main) {
    return (
      <Container className={'weather'}>
        {renderIcon(data.weather[0].icon)}
        <div className={'weather__main'}>
          {renderTemperatures(data.main)}
          <div>
            <FormattedMessage id={data.weather[0].description} defaultMessage={data.weather[0].description} />
          </div>
          <div>
            {`Alle: ${moment.unix(data.dt).format('HH:mm')}`}
          </div>
        </div>
        <div className={'weather__detail'}>
          <div>
            {`Vento: ${mts2kmh(data.wind.speed)} km/h ${deg2card(data.wind.deg)}`}
          </div>
          <div>
            {`Umidità: ${data.main.humidity}%`}
          </div>
          <div>
            {`Pressione: ${hpa2bar(data.main.pressure)}`}
          </div>
          <div>
            <FontAwesomeIcon
              className={'weather__detail__sunrise'}
              icon={'sun'}
            />
            <span
              className={'margin-right-4'}
            >
              {moment.unix(data.sys.sunrise).format('HH:mm')}
            </span>
            <FontAwesomeIcon
              className={'weather__detail__sunset'}
              icon={'moon'}
            />
            <span>
              {moment.unix(data.sys.sunset).format('HH:mm')}
            </span>
          </div>
        </div>
      </Container>
    );
  }

  return null;
}
