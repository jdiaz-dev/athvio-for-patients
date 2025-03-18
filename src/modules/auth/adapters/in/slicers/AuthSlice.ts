import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authInitialState } from 'src/modules/auth/adapters/in/slicers/AuthInitialState';

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    initializeAuthError(state, action: PayloadAction<string>) {
      state.auth.error = action.payload;
      return state;
    },
  },
});

export const { initializeAuthError } = authSlice.actions;

export default authSlice.reducer;
