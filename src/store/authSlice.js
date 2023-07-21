import { createSlice } from "@reduxjs/toolkit";
import { loggin, logginWithFacebook, logginWithGoogle } from "./authThunk";

const initialState = {
  user: {},
  accessToken: "",
  isLogged: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log("reducer: ", action.payload);
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.user = action.payload.userData
    },
    logoutRedux: (state) => {
      state.accessToken = "";
      state.isLogged = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loggin.fulfilled, (state, action) => {
      state.user = action.payload.userData; //me llega del loggin de authThunk
      state.accessToken = action.payload.accessToken; //me llega del loggin de authThunk
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(loggin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loggin.rejected, (state) => {
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(logginWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(logginWithFacebook.fulfilled, (state, action) => {
      console.log("estoy en el authSlice y me llega esto como action.payload: ",action.payload)
      state.user = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false; 
    });
  },
});

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
