import { AnyAction } from 'redux';
import { appDefStateR } from '../defaultStateR/appDefStateR';
import {
  setAddToCartModalT,
  setDialogT,
  setInvoiceModalT,
  setMarketDetailsModalT,
  setMyAddressesOpenT,
  setNearestMarketT,
  setPaymentModalT,
  setSelectedAddressT,
  triggerCartUpdateT,
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
    case setMarketDetailsModalT: {
      return { ...state, marketDetailsModal: payload };
    }
    case setAddToCartModalT: {
      return {
        ...state,
        addToCartModal: { ...state.addToCartModal, ...payload },
      };
    }
    case triggerCartUpdateT: {
      return { ...state, cartUpdateId: payload };
    }
    case setPaymentModalT: {
      return { ...state, paymentModal: payload };
    }
    case setDialogT: {
      return { ...state, dialog: { ...state.dialog, ...payload } };
    }
    case setInvoiceModalT: {
      return { ...state, invoice: { ...state.invoice, ...payload } };
    }
    default:
      return state;
  }
};

export default appReducer;
