import { useState } from "react";
import Login from "./Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../../../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  loggin,
  logginWithGoogle,
  logginWithFacebook,
} from "../../../store/authThunk";
import { useNavigate } from "react-router-dom";

const VALID_PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/;

const LoginContainer = () => {
  const navigate = useNavigate();
  const [mailChangePassword, setMailChangePassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, user, accessToken } = useSelector(
    (store) => store.authSlice
  );
  //const toastDispatch = (message, type) => showMessage(message, type);

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

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    submitCount,
    setValues,
    /*     resetForm,
    setValues, */
    values,
  } = useFormik({
    initialValues,

    onSubmit: (data, { setErrors }) => {
      dispatch(loggin({ data, setErrors }))
        .then((res) => {
          console.log(res);
          if (res.type === "login/rejected") {
            return;
          }
          setValues(initialValues);
          navigate("/");
        })
        .catch((err) => console.log(err));

      //window.location.href = "/";
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

  if (user && accessToken) {
    console.log("user del if: ", user);
    return navigate("/");
  }

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
      ingresarConGoogle={logginWithGoogle}
      ingresarConFacebook={logginWithFacebook}
      handleResetPassword={handleResetPassword}
      mailChangePassword={mailChangePassword}
      dispatch={dispatch}
      isLoading={isLoading}
    />
  );
};

export default LoginContainer;
