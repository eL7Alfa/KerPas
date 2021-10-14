import { setModalOpenT } from './Types/Auth';

export const setModalOpenR = (payload: boolean) => {
  return {
    type: setModalOpenT,
    payload,
  };
};
