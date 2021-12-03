import React, { FC, Fragment, useEffect, useState } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScriptNext,
  useLoadScript,
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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
  });

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

  if (!loadError) {
    return (
      <div {...{ className }}>
        <LoadScriptNext {...{ googleMapsApiKey }}>
          <GoogleMap
            center={destination}
            mapContainerStyle={{ width: '100%' }}
            zoom={13}>
            {directions && <DirectionsRenderer {...{ directions }} />}
          </GoogleMap>
        </LoadScriptNext>
      </div>
    );
  }

  return <Fragment />;
};

export default Direction;
