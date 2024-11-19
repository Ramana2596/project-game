// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import accessControl from '../access/accessControl';

export const accessControlStore = configureStore({
  reducer: {
    accessControl: accessControl,
  },
});
