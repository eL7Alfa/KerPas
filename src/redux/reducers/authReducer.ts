import authDefStateR from '../defaultStateR/authDefStateR';
import { AnyAction } from 'redux';
import {
  setAuthModalOpenT,
  setAuthResetUserDataT,
  setAuthUserDataT,
} from '../Types/AuthRTypes';

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
    default:
      return state;
  }
};

export default authReducer;
