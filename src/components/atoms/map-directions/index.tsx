import React, {useEffect} from 'react';

import MapViewDirections from 'react-native-maps-directions';
const MapDirections = props => {
  const {origin, destination, strokeWidth, strokeColor, handleGetDirections} =
    props;
  // const origin = {latitude: 37.78825, longitude: -122.4324};
  // const destination = {latitude: 37.7749, longitude: -122.4194};

  return (
    <MapViewDirections
      origin={origin}
      destination={destination}
      apikey={'AIzaSyDOg2g1eycO5Z3wnr9F8Mdt-ryTJWgPQT8'}
      strokeWidth={strokeWidth} // strokeWidth={3}
      strokeColor={strokeColor} // strokeColor="hotpink"
      onReady={handleGetDirections}
    />
  );
};

export default MapDirections;
