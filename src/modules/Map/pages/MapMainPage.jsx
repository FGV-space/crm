import React, { useEffect, useState, useCallback } from "react";
import { injectIntl } from "react-intl";
import { setTitle, setSitenav, closeAll } from "../../App/appSlice";
import { Map as MapGl, MapProvider } from 'react-map-gl';
import DeckGL, { IconLayer, FlyToInterpolator, GeoJsonLayer } from 'deck.gl';
import iconAtlas from '../../../images/location-icon-atlas.png';
import iconMapping from '../../../images/location-icon-mapping.json';
import { fetchMarkers } from "../../Dashboard/dashboardSlice";
import { useSelector, useDispatch } from "react-redux";
import Legend from '../components/Legend/Legend';

const INITIAL_VIEW_STATE = {
  longitude: 11.50,
  latitude: 44.00,
  zoom: 5.5,
  maxZoom: 20,
  pitch: 40,
  bearing: -27
};

const MAPBOX_TOKEN = import.meta.env.MAPBOX_TOKEN;
const MAP_STYLE = 'mapbox://styles/velocar/cjxipb9un1tyo1cldhm6zdzod';
const MAP_BLUEPRINT = 'mapbox://styles/velocar/cl6rs9hia000h15lbjtrnruq7';
const MAP_WHITE = 'mapbox://styles/velocar/clgkk5kfn008j01qy2fed41yk';
const MAP_LAND = 'mapbox://styles/velocar/clhivpbos01g601qugoefchyt'
const provincesData = ('../provinces.geojson');

const colorTable = {
  'Bologna': [255, 127, 0],
  'Ferrara': [255, 127, 0],
  'Forlì-Cesena': [255, 127, 0],
  'Ravenna': [255, 127, 0],
  'Modena': [255, 127, 0],
  'Reggio nell\'Emilia': [255, 127, 0],
  'Rimini': [255, 127, 0],
  'Arezzo': [255, 127, 0],
  'Firenze': [255, 127, 0],
  'Grosseto': [255, 127, 0],
  'Livorno': [255, 127, 0],
  'Lucca': [255, 127, 0],
  'Massa-Carrara': [255, 127, 0],
  'Pisa': [255, 127, 0],
  'Pistoia': [255, 127, 0],
  'Prato': [255, 127, 0],
  'Siena': [255, 127, 0],
  'Parma': [15, 133, 83],
  'Piacenza': [15, 133, 83],
  'Genova': [15, 133, 83],
  'Imperia': [15, 133, 83],
  'La Spezia': [15, 133, 83],
  'Savona': [15, 133, 83],
  'Lodi': [15, 133, 83],
  'Pavia': [15, 133, 83],
  'Alessandria': [15, 133, 83],
  'Asti': [15, 133, 83],
  'Cuneo': [15, 133, 83],
  'Torino': [15, 133, 83],
  'Gorizia': [247, 129, 190],
  'Pordenone': [247, 129, 190],
  'Trieste': [247, 129, 190],
  'Belluno': [247, 129, 190],
  'Treviso': [247, 129, 190],
  'Padova': [247, 129, 190],
  'Rovigo': [247, 129, 190],
  'Venezia': [247, 129, 190],
  'Udine': [247, 129, 190],
  'Bergamo': [205, 51, 51],
  'Como': [205, 51, 51],
  'Lecco': [205, 51, 51],
  'Monza e della Brianza': [205, 51, 51],
  'Sondrio': [205, 51, 51],
  'Brescia': [255, 255, 51],
  'Cremona': [255, 255, 51],
  'Mantova': [255, 255, 51],
  'Bolzano/Bozen': [255, 255, 51],
  'Trento': [255, 255, 51],
  'Verona': [255, 255, 51],
  'Valle d\'Aosta/Vallée d\'Aoste': [37, 51, 148],
  'Vercelli': [37, 51, 148],
  'Verbano-Cusio-Ossola': [37, 51, 148],
  'Novara': [37, 51, 148],
  'Biella': [37, 51, 148],
  'Varese': [37, 51, 148],
  'Milano': [37, 51, 148],
  'Vicenza': [129, 16, 124],
}

function Map(props) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.dashboard.markers);
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE);
  const layers = [
    new GeoJsonLayer({
      id: 'province-layer',
      data: provincesData,
      filled: true,
      stroked: true,
      lineWidthMinPixels: 1,
      getFillColor: (f) => colorTable[f.properties.prov_name],
      getLineColor: [255, 255, 255],
      pickable: true,
      opacity: 0.1, // aggiungi questa proprietà per rendere il layer trasparente
      parameters: {
        depthTest: false // aggiungi questa proprietà per leggere le etichette sotto il layer
      }
    }),
    new IconLayer({
      id: 'icon',
      data,
      iconAtlas,
      iconMapping,
      getIcon: d => 'marker',
      sizeUnits: 'meters',
      sizeScale: 2000,
      sizeMinPixels: 16,
      sizeMaxPixels: 32,
      pickable: true,
      opacity: 1,
      getPosition: d => [d.location.coordinates[1],d.location.coordinates[0]],
      onClick
    }),
  ];

  useEffect(() => {
    dispatch(fetchMarkers())
    dispatch(setTitle(props.intl.messages.map));
    dispatch(setSitenav([
      { url: '/map', title: props.intl.messages.map },
    ]));
    dispatch(closeAll());
    goToVelocar();
  }, [dispatch]);

  const onClick = info => {
    if (info) {
      console.log(info);
    }
  };

  const goToVelocar = useCallback(() => {
    setInitialViewState({
      longitude: 10.50,
      latitude: 44.00,
      zoom: 6.5,
      maxZoom: 20,
      pitch: 0,
      bearing: 0,
      transitionDuration: 8000,
      transitionInterpolator: new FlyToInterpolator()
    })
  }, []);

  return (
    <div className={'map'}>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
        ContextProvider={MapProvider}
      >
        <MapGl
          reuseMaps
          mapStyle={MAP_LAND}
          mapboxAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
      <Legend />
    </div>
  );
}

export default injectIntl(Map);
