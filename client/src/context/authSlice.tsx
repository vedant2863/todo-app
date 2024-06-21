import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAuthState {
  status: boolean
  userData: null 
}


const initialState:IAuthState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.status = true
      state.userData = action.payload
    },
    logout: (state) => {
      state.status = false
      state.userData = null
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;