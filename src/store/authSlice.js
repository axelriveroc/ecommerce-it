import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    accessToken: "",
    isLogged: false
  }

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   loginRedux: (state, action) => {
    console.log("reducer: ", action.payload)
    state.accessToken = action.payload.accessToken;
    state.isLogged = true;
    state.user = {
      displayName: action.payload.displayName || "usuario",
      email: action.payload.email,
      photoURL: action.payload.photoURL
    };
   },
   logoutRedux: (state) => {
    state.accessToken = "";
    state.isLogged = false;
    state.user = null;
  },
  },
});

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
