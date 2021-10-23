import authStateR, { authStateRT } from './authStateR';

export interface defaultStateRT {
  authStateR: authStateRT;
}

const defaultStateR: defaultStateRT = {
  authStateR,
};

export default defaultStateR;
