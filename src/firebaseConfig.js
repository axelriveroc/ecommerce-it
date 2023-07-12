import { initializeApp } from "firebase/app"; // llamada a mi app de firebase
import { getFirestore } from "firebase/firestore"; // consumo DB de firebase
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
} from "firebase/auth"; //consumo autenticacion de firebase
import { showMessage } from "./components/common/showMessageToast/showMessageToast";
import { loginRedux, logoutRedux } from "./store/authSlice";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Configurar persistencia antes de utilizar Firebase Authentication
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Continuar con el código de autenticación y escucha de cambios de estado
    initAuthStateListener();
  })
  .catch((error) => {
    console.log("Error al configurar la persistencia de sesión:", error);
  });

// LOGIN
export const onSignInFirebase = async ({ email, password }, setErrors) => {
  try {
    let res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    console.log(error.code);
    if (error.code === "auth/wrong-password") {
      showMessage("Contraseña incorrecta", "error");
      setErrors({ password: "Contraseña incorrecta" });
    } else if (error.code === "auth/too-many-requests") {
      showMessage("Muchas peticiones", "error");
      setErrors({ email: "Muchas peticiones erroneas" });
    } else if (error.code === "auth/user-not-found") {
      showMessage("Este usuario no existe", "error");
      setErrors({ email: "Este usuario no existe" });
    }else{
      console.log(error)
    }
  }
};

// REGISTER
export const register = async ({ email, password }, setErrors) => {
  try {
    let res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      showMessage("Email Invalido", "error");
      setErrors({ email: "Email invalido" });
    } else if (error.code === "auth/email-already-in-use") {
      showMessage("Este correo ya esta en uso", "error");
      setErrors({ email: "Este email ya esta en uso " });
    } else if (error.code) {
      showMessage("Hubo un error", "error");
      setErrors({ email: "Hubo un error" });
    }
  }
};

// LOGIN WITH GOOGLE
let googleProvider = new GoogleAuthProvider();
export const loginWithGoogle = async () => {
  try {
    let res = await signInWithPopup(auth, googleProvider);
    showMessage("Welcome " + res.user.displayName);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Logout
export const logoutFirebase = async () => {
  try {
    await signOut(auth);
    // Otras acciones que desees realizar después del logout
  } catch (error) {
    console.log(error);
  }
};

// escuchar cambios en la autenticacion del usuario con firebase con onAuthStateChanged
export const initAuthStateListener = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuario autenticado
      console.log("Usuario autenticado:", user);
      //const { uid, email } = user;
      if (dispatch && typeof dispatch === "function") {
        dispatch(loginRedux(user));
        //dispatch(loggin(user))  --> no llamar al thunk asyncronico xq me lo rechaza y está para la conexion con la DB. 
      }
      //tmb puedo consultar a la DB cuanto esta autenticado.
    } else {
      // Usuario no autenticado
      console.log("Usuario NO autenticado");

       if (dispatch && typeof dispatch === "function") {
         dispatch(logoutRedux());
       }
    }
  });
};

export const resetPassword = (email)=>{
  sendPasswordResetEmail(auth , email)
}