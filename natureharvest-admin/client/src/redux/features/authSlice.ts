import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStoredToken, clearStoredToken } from '../../utils/authUtils';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const storedToken = getStoredToken();

const initialState: AuthState = {
  token: storedToken,
  isAuthenticated: !!storedToken,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('auth_token', action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      clearStoredToken();
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
      clearStoredToken();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer; 