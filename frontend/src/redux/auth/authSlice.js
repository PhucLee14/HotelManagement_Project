import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: "",
    isLoading: false,
    auth: false,
  },
  reducers: {
    login: (state) => {
      state.data = "";

      state.isLoading = true;
      state.auth = false;
    },
    loginError: (state) => {
      state.data = "";

      state.isLoading = false;
      state.auth = false;
    },
    loginSuccess: (state, action) => {
      state.data = action.payload;

      state.isLoading = false;
      state.auth = true;
    },
    refresh: (state) => {
      state.data = "";

      state.isLoading = true;
      state.auth = false;
    },
    refreshError: (state) => {
      state.data = "";

      state.isLoading = false;
      state.auth = false;
    },
    refreshSuccess: (state, action) => {
      state.data = action.payload;

      state.isLoading = false;
      state.auth = true;
    },
    logout: (state) => {
      state.isLoading = true;
    },
    logoutError: (state) => {
      state.isLoading = false;
    },
    logoutSuccess: (state) => {
      state.data = "";

      state.isLoading = false;
      state.auth = false;
    },
  },
});

export const {
  login,
  loginError,
  loginSuccess,
  refresh,
  refreshError,
  refreshSuccess,
  logout,
  logoutError,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;