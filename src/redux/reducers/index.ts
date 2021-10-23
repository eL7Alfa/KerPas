import authReducer from './authReducer';
import { configureStore } from '@reduxjs/toolkit';
import { authStateRT } from '../defaultStateR/authStateR';

export interface rootReducerI {
  authState: authStateRT;
}

export const rootReducer = {
  authState: authReducer,
};
const store = configureStore({ reducer: rootReducer });
export default store;
