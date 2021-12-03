import React, { FC, useEffect, useState } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScriptNext,
} from '@react-google-maps/api';
import { googleMapsApiKey } from '../../constants';

type DirectionPropsType = {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  className: string;
};

const Direction: FC<DirectionPropsType> = ({
  origin,
  destination,
  className,
}) => {
  // eslint-disable-next-line no-undef
  const DirectionsService = new google.maps.DirectionsService();
  const [directions, setDirections] = useState<any>();

  useEffect(() => {
    if (origin.lat && destination.lat) {
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
  }, [origin, destination]);

  return (
    <div {...{ className }}>
      <LoadScriptNext {...{ googleMapsApiKey }}>
        <GoogleMap center={destination} mapContainerStyle={{ width: '100%' }}>
          {directions && <DirectionsRenderer {...{ directions }} />}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default Direction;
