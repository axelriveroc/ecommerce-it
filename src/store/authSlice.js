import { createSlice } from "@reduxjs/toolkit";
import { loggin, logginWithGoogle } from "./authThunk";

const initialState = {
  user: {},
  accessToken: "",
  isLogged: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log("reducer: ", action.payload);
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.user = {
        displayName: action.payload.displayName || "usuario",
        email: action.payload.email,
        photoURL: action.payload.photoURL,
      };
    },
    logoutRedux: (state) => {
      state.accessToken = "";
      state.isLogged = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loggin.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
      state.user = {
        displayName: action.payload.displayName || "usuario",
        email: action.payload.email,
        photoURL: action.payload.photoURL,
      };
    });
    builder.addCase(loggin.pending, (state) => {
      state.isLoading = true;
      console.log("pending..." + state);
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
