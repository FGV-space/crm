import React, { useEffect } from 'react';
import { Map, MapProvider } from 'react-map-gl';
import DeckGL, { IconLayer } from 'deck.gl';
import { useSelector, useDispatch } from "react-redux";
import { fetchMarkers } from "../../dashboardSlice";
import iconAtlas from '../../../../images/location-icon-atlas.png';
import iconMapping from '../../../../images/location-icon-mapping.json';

const INITIAL_VIEW_STATE = {
  longitude: 11.50,
  latitude: 44.00,
  zoom: 5.5,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

const MAPBOX_TOKEN = import.meta.env.MAPBOX_TOKEN;
const MAP_STYLE = 'mapbox://styles/velocar/cjxipb9un1tyo1cldhm6zdzod';

export default function Maps() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.dashboard.markers);

  useEffect(() => {
    dispatch(fetchMarkers())
  }, [dispatch]);

  const onClick = info => {
    if (info) {
      console.log(info);
    }
  };

  const layers = [
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

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      ContextProvider={MapProvider}
    >
      <Map
        reuseMaps
        mapStyle={MAP_STYLE}
        mapboxAccessToken={MAPBOX_TOKEN}
      />
    </DeckGL>
  );
}
