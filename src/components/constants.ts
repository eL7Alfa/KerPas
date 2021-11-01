import React, { useState } from 'react';
import { SnackbarOrigin } from '@mui/material';
import axios from '../config/axios';
import { productImgUrl } from '../config/urls';
import { AxiosError } from 'axios';
import { userDataRT } from '../redux/defaultStateR/authDefStateR';

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
