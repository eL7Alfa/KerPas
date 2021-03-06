import { setAuthModalOpenT, setAuthUserDataT } from '../Types/AuthRTypes';
import authDefStateR, { userDataRT } from '../defaultStateR/authDefStateR';

export const setAuthModalOpenR = (payload: boolean) => {
  return {
    type: setAuthModalOpenT,
    payload,
  };
};

export const setAuthUserDataR = (payload: userDataRT) => {
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
