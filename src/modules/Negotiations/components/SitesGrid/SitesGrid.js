import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';
import CityTypeahead from '../../../App/components/CityTypeahead/CityTypeahead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SelectLocationFromMap from '../../../Map/components/SelectLocationFromMap/SelectLocationFromMap';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import ItemSubmenuButton from '../../../App/components/ItemSubmenuButton/ItemSubmenuButton';
import { Input } from '../../../App/components/Input/Input';

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'left',
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

const InputGroupButton = styled('div')(({ theme }) => ({
  button: {
    border: theme.palette.pre.border,
    color: theme.palette.pre.color,
  }
}))

function Site(props) {
  const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState('');
  const [initialView, setInitialView] = useState({ longitude: 10.48, latitude: 45.38 });

  async function fetchCoordinates(city) {
    const encodedAddress = encodeURI(city.ctlocal.toLowerCase());

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?country=it&language=it&access_token=${MAPBOX_TOKEN}`;

    try {
      const response = await axios.get(url);
      const { features } = response.data;

      if (features.length > 0) {
        const [longitude, latitude] = features[0].center;

        setInitialView({ latitude, longitude });
      } else {
        console.log('Nessuna corrispondenza trovata per l\'indirizzo specificato');
      }
    } catch (error) {
      console.error('Errore durante la richiesta alle API di Mapbox:', error);
    }
  }

  const handleIdChange = (event) => {
    const newId = event.target.value;
    props.onChange('siteId', newId);
  };

  const handleMilestoneChange = (event) => {
    const newMilestone = event.target.value;
    props.onChange('milestone', newMilestone);
  };

  const handleSpeedLimitChange = (event) => {
    const newSpeedLimit = event.target.value;
    props.onChange('speedLimit', newSpeedLimit);
  };

  const handleSelectCity = (city) => {
    if (city) {
      fetchCoordinates(city)
      props.onChange('city', city);
    } else {
      props.onChange('city', {});
    }
  };

  const handleStreetChange = (event) => {
    const newStreet = event.target.value;
    props.onChange('street', newStreet);
  };

  const handleIntersectionChange = (event) => {
    const newIntersection = event.target.value;
    props.onChange('intersection', newIntersection);
  };

  const handleDepartingChange = (event) => {
    const newDeparting = event.target.value;
    props.onChange('departing', newDeparting);
  };

  const handleApproachingChange = (event) => {
    const newApproaching = event.target.value;
    props.onChange('approaching', newApproaching);
  };

  const handleOpenSelectLocation = (event) => {
    event.preventDefault();

    if (props.site.location && props.site.location.coordinates) {
      const [latitude, longitude] = props.site.location.coordinates;
      setInitialView({ latitude, longitude });
      setCoordinates(props.site.location.coordinates.join(','));
    }

    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleConfirm = (location, city) => {
    setOpen(false);
    props.onChange('location', location);
    props.onChange('street', city.text);
  };

  const handleChangeCoordinates = (event) => {
    const newCoordinates = event.target.value;
    setCoordinates(newCoordinates)
    props.onChange('coordinates', newCoordinates);
  };

  return (
    <Box>
      <div style={{ display: 'block', width: '100%', marginTop: 12 }}>
        <Grid
          container
          alignItems="flex-start"
          columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          rowSpacing={2}
          columns={9}
        >
          <Grid xs={1}>
            <ItemSubmenuButton
              onAddItemAfter={props.onAddItemAfter}
              onAddItemBefore={props.onAddItemBefore}
              onCloneItemBefore={props.onCloneItemBefore}
              onCloneItemAfter={props.onCloneItemAfter}
              onRemove={props.onRemove}
            />
          </Grid>
          <Grid xs={1}>
            <Input
              className={'pre'}
              type="text"
              value={props.site.siteId}
              onChange={handleIdChange}
            />
          </Grid>
          <Grid xs={1}>
            <label>
              Località
            </label>
          </Grid>
          <Grid xs={3}>
            <Item>
              <CityTypeahead
                onChange={handleSelectCity}
                defaultValue={props.site.city}
              />
            </Item>
          </Grid>
          <Grid xs={1}>
            <label>
              Posizione
            </label>
          </Grid>
          <Grid xs={2}>
            <InputGroupButton className="input-group">
              <Input
                className={'input-group-input'}
                type={'text'}
                value={props.site.coordinates}
                onChange={handleChangeCoordinates}
              />
              <div
                className="input-group-button"
              >
                <button
                  onClick={handleOpenSelectLocation}
                >
                  <FontAwesomeIcon icon="fa-location-dot" />
                </button>
              </div>
            </InputGroupButton>
            <SelectLocationFromMap
              open={open}
              initialView={initialView}
              marker={coordinates}
              onUndo={handleClose}
              onConfirm={handleConfirm}
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ display: 'block', width: '100%' }}>
        <Grid
          container
          alignItems="flex-start"
          columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          rowSpacing={2}
          columns={9}
        >
          <Grid xs={1}>
            <label>
              Strada
            </label>
          </Grid>
          <Grid xs={2}>
            <Input
              className={'pre'}
              type="text"
              value={props.site.street}
              onChange={handleStreetChange}
            />
          </Grid>
          <Grid xs={1}>
            <label>
              Chilometrica
            </label>
          </Grid>
          <Grid xs={2}>
            <Input
              className={'pre'}
              type="text"
              value={props.site.milestone}
              onChange={handleMilestoneChange}
            />
          </Grid>
          <Grid xs={1}>
            <label>
              Intersezione
            </label>
          </Grid>
          <Grid xs={2}>
            <Input
              className={'pre'}
              type="text"
              value={props.site.intersection}
              onChange={handleIntersectionChange}
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ display: 'block', width: '100%', paddingBottom: 12, borderBottom: '1px solid hsla(0,0%,100%,.06)' }}>
        <Grid
          container
          alignItems="flex-start"
          columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          rowSpacing={2}
          columns={9}
        >
          <Grid xs={1}>
            <label>
              Dir. allontanamento
            </label>
          </Grid>
          <Grid xs={2}>
            <Input
              className={'pre'}
              type="text"
              value={props.site.departing}
              onChange={handleDepartingChange}
            />
          </Grid>
          <Grid xs={1}>
            <label>
              Dir. avvicinamento
            </label>
          </Grid>
          <Grid xs={2}>
            <Input
              className={'pre'}
              type="text"
              value={props.site.approaching}
              onChange={handleApproachingChange}
            />
          </Grid>
          <Grid xs={1}>
            <label>
              Limite di velocità
            </label>
          </Grid>
          <Grid xs={1}>
            <Input
              className={'pre'}
              type="number"
              value={props.site.speedLimit}
              onChange={handleSpeedLimitChange}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

function SitesGrid(props) {
  const defaultSite = {
    siteId: '010',
    city: {},
    street: '',
    milestone: '',
    speedLimit: 50,
    intersection: '',
    approaching: '',
    departing: '',
    location: {},
    coordinates: '',
  };

  const [sites, setSites] = useState([_.cloneDeep(defaultSite)]);

  //useEffect(() => {
  //  props.onChange(sites);
  //}, [sites]);

  useEffect(() => {
    if (props.sites && props.sites.length > 0) {
      setSites((prevState) => {
        const current = props.sites.map((site, index) => {
          if ('location' in site && site.location.coordinates) {
            return {
              ...site,
              coordinates: site.location.coordinates.join(','),
            }
          }
          return site;
        });

        return current;
      });
    }
  }, [props.sites]);

  const recalculateId = () => {
    setSites(prevState => {
      const sites = prevState.map((site, index) => {
        const siteId = (index + 1) * 10;
        return {
          ...site,
          siteId: siteId.toString().padStart(3, '0'),
        }
      });

      return sites;
    })
  }

  const handleOnChange = (key, value, index) => {
    const current = [...sites];

    if (key === 'city') {
      current[index][key] = _.cloneDeep(value);
    } else {
      current[index][key] = value;
    }

    if (key === 'location') {
      if (value.coordinates) {
        current[index].coordinates = value.coordinates.join(',');
      }
    }
    props.onChange(current);
  };

  const handleAddItemAfter = (index) => {
    setSites((prevSites) => {
      const updatedSites = [...prevSites];
      updatedSites.splice(index + 1, 0, _.cloneDeep(defaultSite));
      return updatedSites;
    });
    recalculateId();
  };

  const handleAddItemBefore = (index) => {
    setSites((prevSites) => {
      if (prevSites.length === 1) {
        return [_.cloneDeep(defaultSite), ...prevSites];
      }
      const updatedSites = [...prevSites];
      updatedSites.splice(index, 0, _.cloneDeep(defaultSite));
      return updatedSites;
    });
    recalculateId();
  };

  const handleCloneItemBefore = (index) => {
    setSites((prevSites) => {
      if (prevSites.length === 1) {
        return [_.cloneDeep(defaultSite), ...prevSites];
      }
      const updatedSites = [...prevSites];
      updatedSites.splice(index, 0, _.cloneDeep(updatedSites[index]));
      return updatedSites;
    });
    recalculateId();
  };

  const handleCloneItemAfter = (index) => {
    setSites((prevSites) => {
      const updatedSites = [...prevSites];

      updatedSites.splice(index + 1, 0, _.cloneDeep(updatedSites[index]));
      return updatedSites;
    });
    recalculateId();
  };

  const handleRemoveItem = (index) => {
    const updatedSites = [...sites];
    updatedSites.splice(index, 1);
    setSites(updatedSites);
    recalculateId();
  };

  return (
    <div>
      <table
        style={{ width: '100%' }}
      >
        <tbody>
        {sites.map((site, index) => (
          <tr
            key={index}
          >
            <td>
              <Site
                key={`site-${index}`}
                site={site}
                onChange={(key, value) => handleOnChange(key, value, index)}
                onAddItemAfter={() => handleAddItemAfter(index)}
                onAddItemBefore={() => handleAddItemBefore(index)}
                onCloneItemBefore={() => handleCloneItemBefore(index)}
                onCloneItemAfter={() => handleCloneItemAfter(index)}
                onRemove={() => handleRemoveItem(index)}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default injectIntl(SitesGrid);
