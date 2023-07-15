import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  db,
  loginWithGoogle,
  onSignInFirebase,
} from "../firebase/firebaseConfig";
import useGetFirebaseData from "../hooks/useGetFirebaseData";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const loggin = createAsyncThunk(
  "login",
  async (argument, { rejectWithValue }) => {
    // esto SE ESTA EJECUTANDO EN EL ONSUBMIT DE FORMIK DEL LOGIN
    try {
      // 1ero ejecuta el login de firebase para la Authentication
      let res = await onSignInFirebase(argument.data, argument.setErrors); //email y password llega en argument.data a traves de la info de los inputs del form
      //Esperamos con el await y si fue exitoso me devuelve una propiedad user con varias cosas, entre ellas el accessToken
      if (res.user.accessToken) {
        const userData = await useGetFirebaseData(
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
        console.log("Respuesta del login con google, el res.user: ", res.user);
        // EMAIL QUE ME DEVUELVE ES riverocoronelaxel@gmail.com --> no existe en mi base de datos la 1era vez
        /*
		displayName:"Axel Rivero"
		email: "riverocoronelaxel@gmail.com"
		photoURL: photoUrl seria en DB. 
		*/

        // 1er buscamos si existe ese usuario en mi DB
        let usersCollection = collection(db, "users");
        let q = query(usersCollection, where("email", "==", res.user.email));
        const userInfo = await getDocs(q); //usamos getDocs y me devuelve un ARRAY.
        let userData;

        if (userInfo.docs.length == 0) {
          //el usuario no existe en la DB , PASAR A CREARLO
          userData = {
            email: res.user.email,
            displayName: res.user.displayName,
            photoUrl: res.user.photoURL,
            rol: "customer",
          };

          const usersCollection = collection(db, "users");
          addDoc(usersCollection, userData);
        } else {
          //el usuario existe en la DB , traerme su info
          userData = {
            ...userInfo.docs[0]?.data(), //esparso mi usuario ---> necesito el metodo data()
            id: userInfo.docs[0]?.id, // uso el ID.     ---> necesito acceder a la propiedad docs que me trae el id
          };
        }
        return {
          userData,
          accessToken: res.user.accessToken,
        };
      } else {
        rejectWithValue("ocurrio un error --> rejectWithValue");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
