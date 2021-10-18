import authDefState from '../defaultState/authDefState';
import { AnyAction } from 'redux';
import { setAuthModalOpenT } from '../Types/Auth';

const authReducer = (state = authDefState, { type, payload }: AnyAction) => {
  switch (type) {
    case setAuthModalOpenT: {
      return { ...state, modalOpen: payload };
    }
    default:
      return state;
  }
};

export default authReducer;
