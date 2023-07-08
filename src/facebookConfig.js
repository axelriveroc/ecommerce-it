import {
	signInWithPopup,
	FacebookAuthProvider,
} from "firebase/auth"; //consumo autenticacion de firebase
import { showMessage } from "./components/common/showMessageToast/showMessageToast";
import { auth } from "./firebaseConfig";





// LOGIN WITH FACEBOOK
let facebookProvider = new FacebookAuthProvider();
export const loginWithFacebook = async () => {
	try {
		let res = await signInWithPopup(auth, facebookProvider);
        console.log(res)
		showMessage("Welcome " + res.user.displayName)
		return res;
	} catch (error) {
		console.log(error);
	}
};



