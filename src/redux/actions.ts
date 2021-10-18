import { setAuthModalOpenT } from './Types/Auth';
import { setAuthUserDataT } from './Types/Auth';
import authDefState from './defaultState/authDefState';

export const setAuthModalOpenR = (payload: boolean) => {
  return {
    type: setAuthModalOpenT,
    payload,
  };
};

export const setAuthUserDataR = (payload: boolean) => {
  return {
    type: setAuthUserDataT,
    payload,
  };
};

export const setAuthResetUserDataR = () => {
  return {
    type: setAuthUserDataT,
    payload: authDefState.userData,
  };
};
