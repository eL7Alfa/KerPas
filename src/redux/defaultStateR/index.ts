import authStateR, { authDefStateRT } from './authDefStateR';

export interface defaultStateRT {
  authStateR: authDefStateRT;
}

const defaultStateR: defaultStateRT = {
  authStateR,
};

export default defaultStateR;
