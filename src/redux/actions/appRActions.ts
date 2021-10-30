import { setNearestMarketT, setSelectedAddressT } from '../Types/AppRTypes';

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
