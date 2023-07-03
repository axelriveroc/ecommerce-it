import { useState } from "react";
import Register from "./Register";
import { useFormik } from "formik";
import * as Yup from "yup";

const VALID_PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/;

const RegisterContainer = () => {
  const [showPassword, setShowPassoword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassoword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassoword(!showPassword);
  };
  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassoword(!showRepeatPassword);
  };

  const initialValues = {
    name: "",
    lastName: "",
    phoneNumer: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const shouldShowError = (fieldName) => {
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
    values,
  } = useFormik({
    initialValues,
    onSubmit: (data) => {
      console.log("se envió el formulario registro", data);
      //aca va a ir el envió a la API con firebase
      /* setValues(initialValues);
       resetForm(); */
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Campo Obligatorio"),
      lastName: Yup.string().required("Campo Obligatorio"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "El número de teléfono debe contener solo dígitos")
        .min(10, "El número de teléfono debe tener al menos 10 dígitos")
        .max(12, "El número de teléfono no puede tener más de 15 dígitos")
        .required("El número de teléfono es requerido"),
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
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas no  coinciden")
        .required("Campo Obligatorio"),
    }),
  });

  return (
    <Register
      showPassword={showPassword}
      showRepeatPassword={showRepeatPassword}
      handleClickShowPassword={handleClickShowPassword}
      handleClickShowRepeatPassword={handleClickShowRepeatPassword}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
      errors={errors}
      shouldShowError={shouldShowError}
      values={values}
    />
  );
};

export default RegisterContainer;