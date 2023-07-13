import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, loginWithGoogle, onSignInFirebase } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const loggin = createAsyncThunk(
  "login",
  async (argument, { rejectWithValue }) => {
    // esto SE ESTA EJECUTANDO EN EL ONSUBMIT DE FORMIK DEL LOGIN
    try {
      // 1ero ejecuta el login de firebase para la Authentication
      let res = await onSignInFirebase(argument.data, argument.setErrors); //email y password llega en argument.data a traves de la info de los inputs del form
      //Esperamos con el await y si fue exitoso me devuelve una propiedad user con varias cosas, entre ellas el accessToken
      if (res.user.accessToken) {
        // busco en mi DB con el email el usuario correspondiente creado anteriormente en register
        let usersCollection = collection(db , "users");
        let q = query(usersCollection , where("email", "==", res.user.email));
        const userInfo = await getDocs(q); //usamos getDocs y me devuelve un ARRAY.

        //desarmo ese usuario de mi DB. El id viene separado de mi user. Entonces lo tengo que armar en userData.
        const userData = {
          ...userInfo.docs[0].data(), //esparso mi usuario ---> necesito el metodo data()
          id: userInfo.docs[0].id // uso el ID.     ---> necesito acceder a la propiedad docs que me trae el id
        };
        console.log("userData ", userData)

        //pero a mi authSlice quiero retornarle toda esa info de mi userData pero tmb el accessToken que me viene de la rta de firebase.
        return {
          userData , accessToken: res.user.accessToken
        } //esto es lo que retorno a mi AUTHSLICE en mi ACTION.PAYLOAD , esto es lo que me interesa!!
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
		let res = await loginWithGoogle();
        if (res.user.accessToken) {
            return res.user
        }else{
            rejectWithValue("ocurrio un error --> rejectWithValue");
        }

  }
);
