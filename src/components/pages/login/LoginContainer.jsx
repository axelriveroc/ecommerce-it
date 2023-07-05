import { useState } from "react";
import Login from "./Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../../firebaseConfig";

const VALID_PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/;

const LoginContainer = () => {
  const [showPassword, setShowPassoword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassoword(!showPassword);
  };

  const initialValues = {
      email: "",
      password: "",
    }

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
/*     resetForm,
    setValues, */
    values
  } = useFormik({
    initialValues,
    onSubmit: async(data) => {
      console.log("se envió el formulario", data);
      let res = await login(data);
      console.log(res)
      //aca va a ir el envió a la API con firebase
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
    />
  );
};

export default LoginContainer;
