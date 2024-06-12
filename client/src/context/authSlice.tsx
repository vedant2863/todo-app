import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signupUser } from "../utils/apis";

interface AuthState {
  status: boolean;
  userData: any | null;
}

const initialState: AuthState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupUser: (state, action: PayloadAction<any>) => {
      const { username, email, password } = action.payload;
      signupUser(username, email, password).then((data) => {
        state.status = true;
        state.userData = data;
      });
    },
    login: (state, action: PayloadAction<any>) => {
      const { username, email, password } = action.payload;
      signupUser(username, email, password).then((data) => {
        state.status = true;
        state.userData = data;
      });
    },

    logout: (state) => {
      try {
        state.status = false;
        state.userData = null;
      } catch (error) {}
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
