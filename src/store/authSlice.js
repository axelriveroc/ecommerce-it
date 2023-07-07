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
    state.user = action.payload
   },
  },
});

export const { loginRedux } = authSlice.actions;

export default authSlice.reducer;
