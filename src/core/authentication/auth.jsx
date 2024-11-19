// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  roles: [], // This will hold the user's roles
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.roles = action.payload.roles;
    },
    logout: (state) => {
      state.user = null;
      state.roles = [];
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
