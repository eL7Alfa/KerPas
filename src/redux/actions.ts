import { setAuthModalOpenT, setAuthUserDataT } from './Types/Auth';
import authDefStateR from './defaultStateR/authDefStateR';

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
    payload: authDefStateR.userData,
  };
};
