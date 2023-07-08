import { initializeApp } from "firebase/app"; // llamada a mi app de firebase
import {getFirestore} from "firebase/firestore" // consumo DB de firebase
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"; //consumo autenticacion de firebase
import { showMessage } from "./components/common/showMessageToast/showMessageToast";

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
const auth = getAuth(app);

// LOGIN
    export const login = async({email, password})=>{
        try {
            let res = await signInWithEmailAndPassword( auth , email, password  )
            return res
        } catch (error) {
            console.log(error)
        }
    }

// REGISTER
    export const register = async({email, password})=>{
        try {
            let res = await createUserWithEmailAndPassword(auth, email, password)
            return res
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                showMessage("Email Invalido", "error")
            }
            else if (error.code === "auth/email-already-in-use") {
                showMessage("Este correo ya esta en uso", "error")
            }
            else if(error.code){
                showMessage("Hubo un error", "error")
            }
        }
    }

// LOGIN WITH GOOGLE
    let googleProvider = new GoogleAuthProvider()
    export const loginWithGoogle = async()=>{
        try {
            let res = await signInWithPopup(auth, googleProvider);
            return res;  
        } catch (error) {
            console.log(error)
        }
    }
    
    