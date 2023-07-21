import Checkout from "./Checkout";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const CheckoutContainer = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    adress: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "",
    eMoneyNumber: "",
    eMoneyPin: "",
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
    resetForm,
    setValues,
    values,
  } = useFormik({
    initialValues,
    onSubmit: (data) => {
      console.log("se envió el formulario", data);
      handleOpen()
      setValues(initialValues);
      resetForm();
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string()
        .email("No corresponde con un tipo de email valido")
        .required("Este campo es requerido"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "El número de teléfono debe contener solo dígitos")
        .min(10, "El número de teléfono debe tener al menos 10 dígitos")
        .max(12, "El número de teléfono no puede tener más de 15 dígitos")
        .required("El número de teléfono es requerido"),
      adress: Yup.string().required("Este campo es requerido"),
      zipCode: Yup.string().required("Este campo es requerido"),
      city: Yup.string().required("Este campo es requerido"),
      country: Yup.string().required("Este campo es requerido"),
      paymentMethod: Yup.string().required("Campo requerido"),
      eMoneyNumber: Yup.string().required("Este campo es requerido"),
      eMoneyPin: Yup.string().required("Este campo es requerido"),
    }),
  });

  return (
    <Checkout
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
      errors={errors}
      shouldShowError={shouldShowError}
      values={values}
      handleClose={handleClose}
      open={open}
      handleOpen={handleOpen}
    />
  );
};

export default CheckoutContainer;
