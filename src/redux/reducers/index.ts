import authReducer from './authReducer';
import { configureStore } from '@reduxjs/toolkit';
import { authDefStateRT } from '../defaultStateR/authDefStateR';

export interface rootReducerI {
  authState: authDefStateRT;
}

export const rootReducer = {
  authState: authReducer,
};
const store = configureStore({ reducer: rootReducer });
export default store;
