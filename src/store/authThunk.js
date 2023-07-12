import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginWithGoogle, onSignInFirebase } from "../firebaseConfig";

/* export const loggin = createAsyncThunk(
  "login",
  async (argument, { rejectWithValue }) => {
    console.log(argument);
    let res = await onSignInFirebase(argument.data, argument.setErrors); //login de firebase con email y password
    if (res.user.accessToken) {
      return res.user;
    } else {
      rejectWithValue("ocurrio un error --> rejectWithValue");
    }
  }
); */

export const loggin = createAsyncThunk(
  "login",
  async (argument, { rejectWithValue }) => {
    console.log(argument);
    try {
      let res = await onSignInFirebase(argument.data, argument.setErrors);
      if (res.user.accessToken) {
        return res.user;
      } else {
        return rejectWithValue("Ocurrió un error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logginWithGoogle = createAsyncThunk(
  "logginWithGoogle",
  async (_, { rejectWithValue }) => {
		let res = await loginWithGoogle();
        if (res.user.accessToken) {
            return res.user
        }else{
            rejectWithValue("ocurrio un error --> rejectWithValue");
        }

  }
);
