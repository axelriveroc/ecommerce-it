import {  useState } from "react";
import Login from "./Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	login,
	loginWithGoogle,
	resetPassword,
} from "../../../firebaseConfig";
import { loginRedux } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { showMessage } from "../../common/showMessageToast/showMessageToast";
import { loginWithFacebook } from "../../../facebookConfig";

const VALID_PASSWORD_REGEX =
	/^(?=.*?[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/;

const LoginContainer = () => {

	const [mailChangePassword, setMailChangePassword] = useState(false);
	const dispatch = useDispatch();
	const toastDispatch = (message, type) => showMessage(message, type);

	const [showPassword, setShowPassoword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassoword(!showPassword);
	};

	const initialValues = {
		email: "",
		password: "",
	};

	const shouldShowError = (fieldName) => {
		//return (touched[fieldName] || submitCount > 0) && errors[fieldName];
		return Boolean(
			(touched[fieldName] || submitCount > 0) && errors[fieldName]
		);
	};

	const ingresarConGoogle = async () => {
		let res = await loginWithGoogle();

		/*

      let userData = {
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };

      // Consulta en la base de datos para obtener datos adicionales
      const usersCollectionRef = collection(db, "users");
      const queryRef = query(usersCollectionRef, where("email", "==", res.user.email));
      const querySnapshot = await getDocs(queryRef);

      const existingUserDoc = querySnapshot.docs[0];

      // Si el documento ya existe, obtén los datos
        if (existingUserDoc) {
          userData = existingUserDoc.data();
        } else {
      // Si el documento no existe, crea un nuevo documento
        await addDoc(collection(db, "users"), {
        email: res.user.email,
        ...
        });
      }
    }
		dispatch(loginRedux(userData));

    hacerlo en un try-catch
*/

		dispatch(loginRedux(res.user));
	};

	const ingresarConFacebook = async () => {
		let res = await loginWithFacebook();
		console.log(res);
		dispatch(loginRedux(res.user));
	};

	const {
		handleChange,
		handleBlur,
		handleSubmit,
		errors,
		touched,
		submitCount,
		/*     resetForm,
    setValues, */
		values,
	} = useFormik({
		initialValues,

		onSubmit: async (data, { setErrors }) => {
			let res = await login(data, setErrors); //login de firebase con email y password
			dispatch(loginRedux(res.user)); // completo la info de mi reducer con la info de firebase
			toastDispatch("Welcome " + res.user.email);

			/**
       * 
    // Consulta en la base de datos para obtener datos adicionales
    const usersCollectionRef = collection(db, "users");
    const queryRef = query(usersCollectionRef, where("email", "==", res.user.email));
    const querySnapshot = await getDocs(queryRef);
    const userData = querySnapshot.docs[0].data();

    // Guardar toda la información necesaria en el estado de Redux
    dispatch(loginRedux({
      email: res.user.email,
      fullName: userData.fullName,
      photoURL: userData.photoURL,
    }));

       * 
       * 
      */

			/* setValues(initialValues)
      resetForm(); */
		},
		validateOnChange: false,
		validateOnBlur: true,
		validationSchema: Yup.object({
			email: Yup.string()
				.email("No corresponde con un tipo de email valido")
				.required("Este campo es requerido"),
			password: Yup.string()
				.min(6, "La contraseña debe tener al menos 6 caracteres")
				.max(20, "La contraseña no debe superar los 20 caracteres")
				.required("Campo Obligatorio")
				.matches(
					VALID_PASSWORD_REGEX,
					"La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
				),
		}),
	});

	const handleResetPassword = async () => {
		// funciona pero hay que validar que no mande el link al pedo
		//validar que realmente sea un mail ya registrado en nuestra base de datos.
		try {
			if (values.email == "")
				console.log("email vacio , no podes recuperar tu contraseña asi");
			if (errors.email) console.log("tenes errores en el mail");
			await resetPassword(values.email);
			setMailChangePassword(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Login
			showPassword={showPassword}
			handleClickShowPassword={handleClickShowPassword}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleBlur={handleBlur}
			errors={errors}
			shouldShowError={shouldShowError}
			values={values}
			ingresarConGoogle={ingresarConGoogle}
			ingresarConFacebook={ingresarConFacebook}
			handleResetPassword={handleResetPassword}
			mailChangePassword={mailChangePassword}
		/>
	);
};

export default LoginContainer;
