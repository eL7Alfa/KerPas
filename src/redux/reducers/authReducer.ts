import authDefState from '../defaultState/authDefState';
import { AnyAction } from 'redux';
import {
  setAuthModalOpenT,
  setAuthResetUserDataT,
  setAuthUserDataT,
} from '../Types/Auth';

const authReducer = (state = authDefState, { type, payload }: AnyAction) => {
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
