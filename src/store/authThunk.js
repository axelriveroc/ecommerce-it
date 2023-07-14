import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginWithGoogle, onSignInFirebase } from "../firebase/firebaseConfig";
import useFirebaseData from "../hooks/useFirebaseData";

export const loggin = createAsyncThunk(
	"login",
	async (argument, { rejectWithValue }) => {
		// esto SE ESTA EJECUTANDO EN EL ONSUBMIT DE FORMIK DEL LOGIN
		try {
			// 1ero ejecuta el login de firebase para la Authentication
			let res = await onSignInFirebase(argument.data, argument.setErrors); //email y password llega en argument.data a traves de la info de los inputs del form
			//Esperamos con el await y si fue exitoso me devuelve una propiedad user con varias cosas, entre ellas el accessToken
			if (res.user.accessToken) {
				const userData = await useFirebaseData(
					"users",
					"email",
					res.user.email
				);
				//pero a mi authSlice quiero retornarle toda esa info de mi userData pero tmb el accessToken que me viene de la rta de firebase.
				return {
					userData,
					accessToken: res.user.accessToken,
				}; //esto es lo que retorno a mi AUTHSLICE en mi ACTION.PAYLOAD , esto es lo que me interesa!!
				//action.payload.userData
				//action.payload.accessToken
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
		try {
      // ejecutamos el login con google de firebase
			let res = await loginWithGoogle();
			if (res.user.accessToken) {
        console.log("Respuesta del login con google, el res.user: ",res.user) 
        // EMAIL QUE ME DEVUELVE ES riverocoronelaxel@gmail.com --> no existe en mi base de datos
				//const userData = await useFirebaseData( "users", "email", res.user.email )
				return res;
				/*  return {
              userData , accessToken: res.user.accessToken
            } */
			} else {
				rejectWithValue("ocurrio un error --> rejectWithValue");
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
