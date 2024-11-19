// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authentication/auth';

export const autStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});
