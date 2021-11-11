import React, { useEffect, useState } from 'react';
import { SnackbarOrigin } from '@mui/material';
import axios from '../config/axios';
import { marketImgUrl, productImgUrl } from '../config/urls';
import { AxiosError } from 'axios';
import { userDataRT } from '../redux/defaultStateR/authDefStateR';
import { setAuthUserDataR } from '../redux/actions/authRActions';
import { setNearestMarketR } from '../redux/actions/appRActions';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerI } from '../redux/reducers';

// Google API Key
export const googleMapsApiKey = 'AIzaSyAtCUe0ZNVf6otms1PhEOIAaB0cW7djbRw';

export type getDistanceMatrixProps = {
  destinations: { lat: number; lng: number }[];
  origins: { lat: number; lng: number }[];
};
export const getDistanceMatrix = async ({
  destinations,
  origins,
}: getDistanceMatrixProps) => {
  const google = window.google;
  const services = new google.maps.DistanceMatrixService();
  const { rows } = await services.getDistanceMatrix({
    destinations,
    origins,
    travelMode: google.maps.TravelMode.DRIVING,
  });
  return rows;
};

// Serialize New Product
export const newProducts = (
  data: {
    cnama_produk: string;
    cimg_top: string;
    nretail_price: number;
    ndiscount: number;
    min_price: number;
  }[],
) =>
  data.map(
    ({
      cnama_produk = '',
      cimg_top = '',
      nretail_price = 0,
      ndiscount = 0,
      min_price = 0,
    }) => {
      return {
        name: cnama_produk,
        imageUri: `${productImgUrl}/${cimg_top}`,
        price: nretail_price,
        discount: ndiscount,
        fixedPrice: min_price,
      };
    },
  );

// Serialize New Markets
export const newMarkets = (
  data: {
    id: number;
    ckode_mitra: string;
    cnama_mitra: string;
    calamat_toko: string;
    distance: { text: string; value: number };
    ckota: string;
    cfoto: string;
  }[],
) =>
  data.map(
    ({
      id,
      ckode_mitra,
      cnama_mitra,
      calamat_toko,
      distance,
      ckota,
      cfoto,
    }) => {
      return {
        marketId: id,
        marketCode: ckode_mitra,
        marketName: cnama_mitra,
        address: calamat_toko,
        distance: distance,
        location: ckota,
        marketImg: `${marketImgUrl}/${cfoto}`,
      };
    },
  );

// Auth
export const checkUserData = () =>
  new Promise<userDataRT>((resolve, reject) => {
    const _userData = localStorage.getItem('userData');
    if (_userData) {
      const userData = JSON.parse(_userData);
      axios(userData.token)
        .post('/user/retrieve', {
          ckode_user: userData.ckode_user,
        })
        .then(({ data: { response, result } }) => {
          if (response === 200) {
            const newUserData = { ...result, token: userData.token };
            localStorage.setItem('userData', JSON.stringify(newUserData));
            resolve(newUserData);
          }
        })
        .catch((e: AxiosError) => {
          reject(e);
        });
    }
  });

// Snackbar
export type snackbarStateT = {
  open: boolean;
  msg: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  anchorOrigin?: SnackbarOrigin;
  timeout?: number;
  key: number;
};

export const useSnackbarConst = () => {
  const [snackPack, setSnackPack] = React.useState<readonly snackbarStateT[]>(
    [],
  );
  const [snackbarState, setSnackbarState] = useState<snackbarStateT>({
    open: false,
    severity: 'success',
    msg: '',
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    timeout: 3000,
    key: new Date().getTime(),
  });

  React.useEffect(() => {
    if (snackPack.length && !snackbarState.open) {
      setSnackPack(prev => prev.slice(1));
      setSnackbarState(prev => ({ ...prev, ...snackPack[0], open: true }));
    } else if (snackPack.length && snackbarState.open) {
      setSnackbarState(prev => ({ ...prev, open: false }));
    }
  }, [snackPack, snackbarState.open]);

  const onSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarState(prev => ({ ...prev, open: false }));
  };

  return { snackbarState, setSnackPack, onSnackbarClose };
};

export const useInit = () => {
  const selector = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();

  let locationRequestCount = 0;
  const getNearestMarketByDeviceAddress = () => {
    locationRequestCount++;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude, accuracy } = coords;
        if (accuracy <= 50) {
          axios()
            .post('/market/nearest', { lat: latitude, lng: longitude })
            .then(({ data: { result, response } }) => {
              if (response === 200) {
                dispatch(setNearestMarketR(result));
              }
            });
        } else {
          if (locationRequestCount <= 6) {
            getNearestMarketByDeviceAddress();
          }
        }
      },
      () => {
        if (locationRequestCount <= 6) {
          getNearestMarketByDeviceAddress();
        }
      },
      { enableHighAccuracy: true, timeout: 3000 },
    );
  };

  const getNearestMarket = ({ lat, lng }: { lat: number; lng: number }) => {
    axios()
      .post('/market/nearest', { lat, lng })
      .then(({ data: { result, response } }) => {
        if (response === 200) {
          dispatch(setNearestMarketR(result));
        } else {
          dispatch(setNearestMarketR({}));
        }
      });
  };

  useEffect(() => {
    if (Object.keys(selector.appState.selectedAddress).length !== 0) {
      const { dlat: lat, dlng: lng } = selector.appState.selectedAddress;
      getNearestMarket({ lat, lng });
    } else {
      getNearestMarketByDeviceAddress();
    }
  }, [selector.appState.selectedAddress]);

  useEffect(() => {
    checkUserData()
      .then(userData => {
        if (userData) {
          dispatch(setAuthUserDataR(userData));
        }
      })
      .catch(() => {});
  }, []);
};
