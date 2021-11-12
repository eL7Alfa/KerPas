import {
  setMarketDetailsModalOpenT,
  setMyAddressesOpenT,
  setNearestMarketT,
  setSelectedAddressT,
} from '../Types/AppRTypes';
import { appDefStateRT } from '../defaultStateR/appDefStateR';

export const setSelectedAddressR = (
  payload: appDefStateRT['selectedAddress'],
) => {
  return {
    type: setSelectedAddressT,
    payload,
  };
};

export const setNearestMarketR = (payload: appDefStateRT['nearestMarket']) => {
  return {
    type: setNearestMarketT,
    payload,
  };
};

export const setMyAddressesOpenR = (
  payload: appDefStateRT['myAddressesOpen'],
) => {
  return {
    type: setMyAddressesOpenT,
    payload,
  };
};

export const setMarketDetailsModalOpenR = (
  payload: appDefStateRT['marketDetailsModalOpen'],
) => {
  return {
    type: setMarketDetailsModalOpenT,
    payload,
  };
};
