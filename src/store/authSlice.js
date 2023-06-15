import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    accessToken: "",
    isLogged: false
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  redurcers: {
   login: () => {},
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
