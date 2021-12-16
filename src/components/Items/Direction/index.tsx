import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLoadScript } from '@react-google-maps/api';
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

  const mapRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState<number>(13);
  // eslint-disable-next-line no-undef
  const [center, setCenter] = useState<any>(destination);
  const [initDone, setInitDone] = useState<boolean>(false);

  const directionServiceListener = useCallback(
    directionsDisplay => {
      if (isLoaded && origin.lat && origin.lng) {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
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
              directionsDisplay.setDirections(
                // eslint-disable-next-line no-undef
                result as google.maps.DirectionsResult,
              );
            } else {
              console.error(`error fetching directions ${result}`);
            }
          },
        );
      }
    },
    [isLoaded, origin, destination],
  );

  useEffect(() => {
    if (isLoaded && mapRef && !initDone) {
      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(mapRef.current as Element, {
        center,
        zoom,
      });

      // eslint-disable-next-line no-undef
      google.maps.event.addListener(map, 'zoom_changed', () => {
        setZoom(map.getZoom() as number);
      });

      // eslint-disable-next-line no-undef
      google.maps.event.addListener(map, 'center_changed', () => {
        // eslint-disable-next-line no-undef
        setCenter(map.getCenter() as google.maps.LatLng);
      });

      // eslint-disable-next-line no-undef
      const directionsDisplay = new google.maps.DirectionsRenderer({
        map,
        preserveViewport: true,
        markerOptions: {
          visible: true,
        },
      });

      // eslint-disable-next-line no-undef
      new google.maps.Marker({
        position: origin,
        map,
        visible: false,
      });

      // eslint-disable-next-line no-undef
      new google.maps.Marker({
        position: destination,
        map,
        visible: false,
      });

      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
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
            directionsDisplay.setDirections(
              // eslint-disable-next-line no-undef
              result as google.maps.DirectionsResult,
            );
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      );

      directionServiceListener(directionsDisplay);
      setInitDone(true);
    }
  }, [mapRef, isLoaded, directionServiceListener]);

  if (!loadError) {
    return (
      <div {...{ className }}>
        <div ref={mapRef} style={{ width: '100%' }} />
      </div>
    );
  }

  return <Fragment />;
};

export default Direction;
