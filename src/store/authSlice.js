import { createSlice } from "@reduxjs/toolkit";
import { loggin, logginWithGoogle } from "./authThunk";

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
      //aca necesito llamar a la base de datos para traerme la info
      state.user = action.payload
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
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
      state.user = {
        displayName: action.payload.displayName || "usuario",
        email: action.payload.email,
        photoURL: action.payload.photoURL,
      };
    });
  },
});

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
