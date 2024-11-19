// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gameId : null,
    gameBatch : null,
    gameTeam : null,
};

const accessControlSlice = createSlice({
  name: 'accessControl',
  initialState,
  reducers: {
    setUserGameRoles: (state) => {
      state.gameId = 'OpsMgt';
      state.gameBatch = 1;
      state.gameTeam = 'ALPHA';
    },
    resetUserGameRoles: (state) => {
        state.gameId = null;
        state.gameBatch = null;
        state.gameTeam = null;
    },
  },
});

export const { setUserGameRoles, resetUserGameRoles } = accessControlSlice.actions;

export default accessControlSlice.reducer;
