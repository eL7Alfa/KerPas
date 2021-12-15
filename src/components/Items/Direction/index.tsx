import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  DirectionsRenderer as DirectionsR,
  GoogleMap as GMap,
  LoadScriptNext,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { googleMapsApiKey } from '../../constants';

type DirectionPropsType = {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  className: string;
};

const Direction = ({ origin, destination, className }: DirectionPropsType) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
  });

  const GoogleMap = useRef(GMap).current;
  const DirectionsRenderer = useRef(DirectionsR).current;

  const [directions, setDirections] = useState<any>();
  useEffect(() => {
    if (isLoaded && !!origin.lat && !!destination.lat) {
      // eslint-disable-next-line no-undef
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          // eslint-disable-next-line no-undef
          origin,
          // eslint-disable-next-line no-undef
          destination,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          // eslint-disable-next-line no-undef
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      );
    } else {
      setDirections(undefined);
    }
  }, [origin, destination, isLoaded]);

  const DirectionR = () => (
    <DirectionsRenderer
      {...{ directions }}
      options={{
        suppressMarkers: true,
        suppressBicyclingLayer: true,
      }}
    />
  );

  const Map = ({ children }: any) => (
    <GoogleMap
      center={destination}
      mapContainerStyle={{ width: '100%' }}
      zoom={13}>
      <Marker position={origin} />
      <Marker position={destination} />
      {directions && <DirectionR />}
    </GoogleMap>
  );

  if (!loadError) {
    return (
      <div {...{ className }}>
        <LoadScriptNext {...{ googleMapsApiKey }}>
          <Map>
            <DirectionR />
          </Map>
        </LoadScriptNext>
      </div>
    );
  }

  return <Fragment />;
};

export default Direction;
