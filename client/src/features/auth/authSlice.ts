import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import { signin, signup, logout } from './authAPI';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setStatus: (state, action: PayloadAction<AuthState['status']>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setToken, setStatus, setError } = authSlice.actions;

export const signupUser = (username: string, email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setStatus('loading'));
  try {
    const token = await signup(username, email, password);
    dispatch(setToken(token));
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const signinUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setStatus('loading'));
  try {
    const token = await signin(email, password);
    dispatch(setToken(token));
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  dispatch(setStatus('loading'));
  try {
    await logout();
    dispatch(setToken(null));
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus('failed'));
  }
};

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
