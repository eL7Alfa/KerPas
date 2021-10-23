import { setAuthModalOpenT, setAuthUserDataT } from './Types/Auth';
import authStateR from './defaultStateR/authStateR';

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
    payload: authStateR.userData,
  };
};
