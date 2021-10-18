import { setAuthModalOpenT } from './Types/Auth';

export const setAuthModalOpenR = (payload: boolean) => {
  return {
    type: setAuthModalOpenT,
    payload,
  };
};
