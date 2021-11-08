import authReducer from './authReducer';
import { configureStore } from '@reduxjs/toolkit';
import { authDefStateRT } from '../defaultStateR/authDefStateR';
import { appDefStateRT } from '../defaultStateR/appDefStateR';
import appReducer from './appReducer';

export interface rootReducerI {
  authState: authDefStateRT;
  appState: appDefStateRT;
}

export const rootReducer = {
  authState: authReducer,
  appState: appReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
