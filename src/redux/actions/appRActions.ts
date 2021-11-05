import {
  setMyAddressesOpenT,
  setNearestMarketT,
  setSelectedAddressT,
} from '../Types/AppRTypes';

export const setSelectedAddressR = (payload: any) => {
  return {
    type: setSelectedAddressT,
    payload,
  };
};

export const setNearestMarketR = (payload: any) => {
  return {
    type: setNearestMarketT,
    payload,
  };
};

export const setMyAddressesOpenR = (payload: any) => {
  return {
    type: setMyAddressesOpenT,
    payload,
  };
};
