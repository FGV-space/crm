import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import DeckGL, { FlyToInterpolator, IconLayer, MapController } from 'deck.gl';
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  AppBar,
  Toolbar,
  Stack, Table, TableBody, TableRow, TableCell
} from '@mui/material';
import { buttonStyleGreen, buttonStyleOrange, buttonStyleGreenLight, buttonStyleOrangeLight } from '../../../../util/material';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Map } from 'react-map-gl';
import iconAtlas from '../../../../images/location-icon-atlas.png';
import iconMapping from '../../../../images/location-icon-mapping.json';
import axios from 'axios';
import { injectIntl } from 'react-intl';
import { validateCoordinates } from '../../../../util/utils';
import { styled } from '@mui/material/styles';
import { Input } from '../../../App/components/Input/Input';

const MAPBOX_TOKEN = import.meta.env.MAPBOX_TOKEN;

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.pre.backgroundColor,
  }
}));

const StyledSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledTableBody = styled(TableBody)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

function PaperComponent(props) {
  const draggableRef = useRef();

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={draggableRef}
    >
      <Paper {...props} ref={draggableRef} />
    </Draggable>
  );
}

class Feature {
  constructor() {
    this.type = 'Feature';
    this.geometry = {
      type: 'Point',
      coordinates: []
    };
    this.properties = {};
    this.place_name_it = 'Nessun risultato trovato';
    this.center = [];
  }
}

function SelectLocationFromMap(props) {
  const INITIAL_VIEW_STATE = {
    longitude: 10.48,
    latitude: 45.38,
    zoom: 14,
    maxZoom: 20,
    pitch: 0,
    bearing: 0
  };
  const [markers, setMarkers] = useState([]);
  const [city, setCity] = useState({});
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [search, setSearch] = useState('');
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE);
  const theme = useSelector(state => state.app.theme);

  useEffect(() => {
    if (validateCoordinates(props.marker)) {
      const coordinate = props.marker.split(',');
      const coordinates = [parseFloat(coordinate[0]), parseFloat(coordinate[1])]
      const newMarker = {
        type: 'Point',
        coordinates,
      };
      setMarkers([newMarker]);
      goToMarker(coordinates);
    }
  }, [props.marker])

  useEffect(() => {
    if (props.initialView) {
      setInitialViewState({
        longitude: props.initialView.longitude,
        latitude: props.initialView.latitude,
        zoom: 14,
        maxZoom: 20,
        pitch: 0,
        bearing: 0,
        transitionDuration: 4000,
        transitionInterpolator: new FlyToInterpolator()
      })
    }
  }, [props.initialView]);

  async function fetchReverseGeocoding(latitude, longitude) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&types=place%2Cpostcode%2Caddress&language=it&access_token=${MAPBOX_TOKEN}`;

    try {
      const response = await axios.get(url);
      const { features } = response.data;

      if (features.length > 0) {
       setCity(features[0]);
      } else {
        console.log('Nessuna corrispondenza trovata per l\'indirizzo specificato');
      }
    } catch (error) {
      console.error('Errore durante la richiesta alle API di Mapbox:', error);
    }
  }

  async function fetchGeocoding(search) {
    const encodedSearch = encodeURIComponent(search);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSearch}.json?country=it&proximity=ip&language=it&access_token=${MAPBOX_TOKEN}`;

    try {
      const response = await axios.get(url);
      const { features } = response.data;

      if (features.length > 0) {
        setResults(features);
        setShowResults(true);
      } else {
        setResults([...new Feature()]);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Errore durante la richiesta alle API di Mapbox:', error);
    }
  }

  const goToMarker = useCallback((coordinates) => {
    setInitialViewState({
      longitude: coordinates[1],
      latitude: coordinates[0],
      zoom: 14,
      maxZoom: 20,
      pitch: 0,
      bearing: 0,
      transitionDuration: 4000,
      transitionInterpolator: new FlyToInterpolator()
    })
  }, []);

  const getGoordinates = (coordinates) => {
    if (coordinates && coordinates.length === 2) {
      return `${coordinates[1]},${coordinates[0]}`;
    }

    return '';
  };

  const setMarker = (result) => {
    const coordinates = [result.center[1], result.center[0]];
    const newMarker = {
      type: 'Point',
      coordinates,
    };
    setMarkers([newMarker]);
    setCity(result);
    setShowResults(false);
    goToMarker(coordinates);
  };

  const handleOnConfirm = (event) => {
    props.onConfirm(markers[0], city);
  };

  const handleOnUndo = (event) => {
    props.onUndo();
  };

  const handleMapClick = event => {
    const { coordinate } = event;
    const newMarker = {
      type: 'Point',
      coordinates: [coordinate[1], coordinate[0]]
    };
    setMarkers([newMarker]);
    fetchReverseGeocoding(newMarker.coordinates[0], newMarker.coordinates[1]);
  };

  const layers = [
    new IconLayer({
      id: 'icon',
      data: markers,
      iconAtlas,
      iconMapping,
      getIcon: d => 'marker',
      sizeUnits: 'meters',
      sizeScale: 2000,
      sizeMinPixels: 16,
      sizeMaxPixels: 32,
      pickable: true,
      opacity: 1,
      getPosition: d => [d.coordinates[1],d.coordinates[0]],
    }),
  ];

  const handleSearch = async (event) => {
    const { value } = event.target;
    setSearch(value);
    await fetchGeocoding(value);
  };

  return (
    <StyledDialog
      fullScreen
      open={props.open}
      onClose={handleOnUndo}
      PaperComponent={PaperComponent}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ width: '100%' }}
          >
            <Stack spacing={2} direction="row">
              <StyledSpan
                style={{ fontSize: 18 }}
              >
                <FontAwesomeIcon
                  icon={'magnifying-glass'}
                  style={{ color: '#eeeeee' }}
                />
              </StyledSpan>
              <span>
                <Input
                  type="text"
                  name="search"
                  value={search}
                  placeholder={'Ricerca'}
                  onChange={handleSearch}
                  style={{
                    fontSize: 16,
                    border: 'none',
                    width: '300px',
                  }}
                />
              </span>
            </Stack>
            <Stack spacing={2} direction="row">
              <Button
                autoFocus
                variant={theme === 'dark' ? 'outlined' : 'contained'}
                style={theme === 'dark' ? buttonStyleOrange : buttonStyleOrangeLight}
                onClick={handleOnUndo}
                startIcon={<FontAwesomeIcon icon={'fa-xmark'} />}
                disableElevation={Boolean(theme === 'light')}
              >
                {props.intl.messages.undo}
              </Button>
              <Button
                variant={theme === 'dark' ? 'outlined' : 'contained'}
                style={theme === 'dark' ? buttonStyleGreen : buttonStyleGreenLight}
                onClick={handleOnConfirm}
                startIcon={<FontAwesomeIcon icon={'fa-location-crosshairs'} />}
                disableElevation={Boolean(theme === 'light')}
              >
                {props.intl.messages.insert}
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{
          overflow: 'hidden',
        }}
      >
        {search !== '' && showResults && (
          <Paper sx={{ width: '100%', overflow: 'hidden', position: 'absolute', zIndex: 2, top: 64, left: 0 }}>
            <Table
              size="small"
            >
              <StyledTableBody>
                {results.map((result, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: 'pointer',
                    }}
                    onClick={() => setMarker(result)}
                  >
                    <StyledTableCell>
                      {result.place_name_it}
                    </StyledTableCell>
                    <StyledTableCell>
                      {getGoordinates(result.center)}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </StyledTableBody>
            </Table>
          </Paper>
        )}
        <div>
          <DeckGL
            controller={MapController}
            initialViewState={initialViewState}
            layers={layers}
            onClick={handleMapClick}
          >
            <Map
              reuseMaps
              mapStyle={'mapbox://styles/velocar/clbewqmsk004b14o0qjiiyhf8'}
              mapboxAccessToken={MAPBOX_TOKEN}
            />
          </DeckGL>
        </div>
      </DialogContent>
    </StyledDialog>
  );
}

export default injectIntl(SelectLocationFromMap);
