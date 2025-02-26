import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { email, token } = action.payload;
      state.user = { email, token };
      state.isAuthenticated = !!token;

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", token);
    },
    registerSuccess: (state, action) => {
      const { email, token } = action.payload;
      state.user = { email, token };
      state.isAuthenticated = !!token;

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, registerSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
