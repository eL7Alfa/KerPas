import { AnyAction } from 'redux';
import { appDefStateR } from '../defaultStateR/appDefStateR';
import {
  setMyAddressesOpenT,
  setNearestMarketT,
  setSelectedAddressT,
} from '../Types/AppRTypes';

const appReducer = (state = appDefStateR, { type, payload }: AnyAction) => {
  switch (type) {
    case setSelectedAddressT: {
      return { ...state, selectedAddress: payload };
    }
    case setNearestMarketT: {
      return { ...state, nearestMarket: payload };
    }
    case setMyAddressesOpenT: {
      return { ...state, myAddressesOpen: payload };
    }
    default:
      return state;
  }
};

export default appReducer;
