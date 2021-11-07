import authDefStateR from '../defaultStateR/authDefStateR';
import { AnyAction } from 'redux';
import {
  setAuthCallbackT,
  setAuthModalOpenT,
  setAuthResetUserDataT,
  setAuthUserDataT,
} from '../Types/Auth';

const authReducer = (state = authDefStateR, { type, payload }: AnyAction) => {
  switch (type) {
    case setAuthModalOpenT: {
      return { ...state, modalOpen: payload };
    }
    case setAuthUserDataT: {
      return { ...state, userData: payload };
    }
    case setAuthResetUserDataT: {
      return { ...state, userData: payload };
    }
    case setAuthCallbackT: {
      return { ...state, authCallback: payload };
    }
    default:
      return state;
  }
};

export default authReducer;
