import React, { useEffect, useState } from 'react';
import { SnackbarOrigin } from '@mui/material';
import axios from '../config/axios';
import { marketImgUrl, productImgUrl, supplierImgUrl } from '../config/urls';
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
export type ProductParamsTypes = {
  id?: number;
  ckode_produk?: string;
  cnama_produk: string;
  cimg_top: string;
  cimg?: string[];
  nretail_price: number;
  ndiscount: number;
  min_price: number;
  cslug: string;
  mitra?: any;
  csku?: string;
  cnama_kategori?: string;
  ckelas?: string;
  cnama_kelas?: string;
  nberat?: number;
  cdeskripsi?: string;
  csatuan?: string;
  cmerk?: string;
  variasi?: any[];
};

export type ProductTypes = {
  productId?: number;
  productCode?: string;
  name: string;
  imageTop?: string;
  imageUri: string;
  imagesUri?: string[];
  price: number;
  discount: number;
  fixedPrice: number;
  slug: string;
  market?: any;
  sku?: string;
  category?: string;
  classCode?: string;
  class?: string;
  weight?: number;
  description?: string;
  unit?: string;
  brand?: string;
  variants?: any[];
};

export interface newProductsTypes<T = ProductParamsTypes[]> {
  (data: T): ProductTypes[];
}

export const newProducts: newProductsTypes = data =>
  data.map(
    ({
      id,
      ckode_produk,
      cnama_produk = '',
      cimg_top = '',
      cimg,
      nretail_price = 0,
      ndiscount = 0,
      min_price = 0,
      cslug,
      mitra,
      csku,
      cnama_kategori,
      ckelas,
      cnama_kelas,
      nberat,
      cdeskripsi,
      csatuan,
      cmerk,
      variasi,
    }) => {
      return {
        productId: id,
        productCode: ckode_produk,
        name: cnama_produk,
        imageTop: cimg_top,
        imageUri: `${productImgUrl}/${cimg_top}`,
        imagesUri: cimg?.map(ci => `${productImgUrl}/${ci}`),
        price: nretail_price,
        discount: ndiscount,
        fixedPrice: min_price,
        slug: cslug,
        market: mitra,
        sku: csku,
        category: cnama_kategori,
        class: cnama_kelas,
        classCode: ckelas,
        weight: nberat,
        description: `<div>${cdeskripsi}</div>`,
        unit: csatuan,
        brand: cmerk,
        variants: variasi,
      };
    },
  );

// Serialize New Markets
export type MarketParamsTypes = {
  id?: number;
  ckode_mitra: string;
  cnama_mitra: string;
  calamat_toko: string;
  distance: { text: string; value: number };
  ckota: string;
  cfoto: string;
  cdeskripsi: string;
};

export type MarketTypes = {
  marketId?: number;
  marketCode: string;
  marketName: string;
  address: string;
  distance: { text: string; value: number };
  location: string;
  marketImg: string;
  description: string;
};

export interface newMarketsTypes<T = MarketParamsTypes[]> {
  (data: T): MarketTypes[];
}

export const newMarkets: newMarketsTypes = data =>
  data.map(
    ({
      id,
      ckode_mitra,
      cnama_mitra,
      calamat_toko,
      distance,
      ckota,
      cfoto,
      cdeskripsi,
    }) => {
      return {
        marketId: id,
        marketCode: ckode_mitra,
        marketName: cnama_mitra,
        address: calamat_toko,
        distance: distance,
        location: ckota,
        marketImg: `${marketImgUrl}/${cfoto}`,
        description: `<div>${cdeskripsi}</div>`,
      };
    },
  );

export type SupplierParamsTypes = {
  id: number;
  ckode_supplier: string;
  cnama_supplier: string;
  cimg_supplier: string;
  calamat_supplier: string;
  ckontak_supplier: string;
  mitra: MarketParamsTypes;
  ccategory_supplier: any[];
};

export type SupplierTypes = {
  supplierId: number;
  supplierCode: string;
  imageUri: string;
  address: string;
  contact: string;
  name: string;
  marketName: string;
  block: string;
  location: string;
  categories: any[];
};

export interface nweSuppliersTypes<T = SupplierParamsTypes[]> {
  (data: T): SupplierTypes[];
}

export const newSuppliers: nweSuppliersTypes = data =>
  data.map(
    ({
      id,
      ckode_supplier,
      cnama_supplier,
      cimg_supplier,
      calamat_supplier,
      ckontak_supplier,
      mitra,
      ccategory_supplier,
    }) => {
      return {
        supplierId: id,
        supplierCode: ckode_supplier,
        imageUri: `${supplierImgUrl}/${cimg_supplier}`,
        address: calamat_supplier,
        contact: ckontak_supplier,
        name: cnama_supplier,
        marketName: mitra.cnama_mitra,
        block: '',
        location: mitra.ckota,
        categories: ccategory_supplier,
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
          dispatch(
            setNearestMarketR({
              calamat_toko: '',
              cdeskripsi: '',
              cfoto: '',
              ckode_mitra: '',
              ckota: '',
              cnama_mitra: '',
              distance: { text: '', value: 0 },
            }),
          );
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

// Serialize New Product
export type CartProductParamsTypes = {
  _id?: number;
  ckode_produk?: string;
  cnama_produk: string;
  cimg: string;
  nprice: number;
  ndiscount: number;
  cslug: string;
  mitra?: any;
  csku?: string;
  nberat?: number;
  csatuan?: string;
  id_variasi?: number;
  variasi?: string;
  id_ukuran?: number;
  ukuran?: string;
};

export type CartProductTypes = {
  cartId?: number;
  cartCode?: string;
  name: string;
  imageTop?: string;
  imageUri: string;
  price: number;
  discount: number;
  slug: string;
  market?: any;
  sku?: string;
  weight?: number;
  unit?: string;
  variantId?: number;
  variantName?: string;
  sizeId?: number;
  size?: string;
};

export interface newCartProductsTypes<T = CartProductParamsTypes[]> {
  (data: T): CartProductTypes[];
}

export const newCartProducts: newCartProductsTypes = data =>
  data.map(
    ({
      _id,
      ckode_produk,
      cnama_produk = '',
      nprice,
      cimg = '',
      ndiscount = 0,
      cslug,
      mitra,
      csku,
      nberat,
      csatuan,
      id_variasi,
      variasi,
      id_ukuran,
      ukuran,
    }) => {
      return {
        cartId: _id,
        cartCode: ckode_produk,
        name: cnama_produk,
        imageTop: cimg,
        imageUri: `${productImgUrl}/${cimg}`,
        price: nprice,
        discount: ndiscount,
        fixedPrice: nprice * (ndiscount / 100),
        slug: cslug,
        market: mitra,
        sku: csku,
        weight: nberat,
        unit: csatuan,
        variantId: id_variasi,
        variantName: variasi,
        sizeId: id_ukuran,
        size: ukuran,
      };
    },
  );
