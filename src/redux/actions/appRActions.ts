import {
  setAddToCartModalT,
  setDialogT,
  setMarketDetailsModalT,
  setMyAddressesOpenT,
  setNearestMarketT,
  setPaymentModalT,
  setSelectedAddressT,
  triggerCartUpdateT,
} from '../Types/AppRTypes';
import { v4 as uuid } from 'uuid';
import { appDefStateR, appDefStateRT } from '../defaultStateR/appDefStateR';

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

export const setMarketDetailsModalR = (
  payload: appDefStateRT['marketDetailsModal'],
) => {
  return {
    type: setMarketDetailsModalT,
    payload,
  };
};

export const setAddToCartModalR = (
  payload: appDefStateRT['addToCartModal'],
) => {
  return {
    type: setAddToCartModalT,
    payload,
  };
};

export const triggerCartUpdateR = () => {
  return {
    type: triggerCartUpdateT,
    payload: uuid(),
  };
};

export const setPaymentModalR = (payload: appDefStateRT['paymentModal']) => {
  return {
    type: setPaymentModalT,
    payload,
  };
};

export const setDialogR = (payload: appDefStateRT['dialog']) => {
  return {
    type: setDialogT,
    payload,
  };
};

export const resetDialogR = () => {
  return {
    type: setDialogT,
    payload: appDefStateR.dialog,
  };
};
