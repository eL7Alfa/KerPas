import authReducer from './authReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = {
  authState: authReducer,
};
const store = configureStore({ reducer: rootReducer });
export default store;
