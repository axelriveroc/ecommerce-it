import axios from "axios";
import Checkout from "./Checkout";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useSelector } from "react-redux";
//import { MercadoPago } from "@mercadopago/sdk-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const CheckoutContainer = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {cart} = useSelector(store => store.cartSlice)
    const {user} = useSelector(store => store.authSlice)


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
    onSubmit: async(data) => {
      console.log("se envió el formulario", data);
      handleBuy()

     //let idVenta = await getPaymentId(preferenceId);

     let ventaParaDB = {
      ...data,
      //idVenta: idVenta, 
      productosCommprados:newCartMP, 
      cliente: user

      
     }

      const productsCollection = collection(db, "ventas");
      await addDoc(productsCollection, ventaParaDB);

      
      //handleOpen()
      setValues(initialValues);
      
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



  // MERCADOPAGO LOGICA

	const [preferenceId, setPreferenceId] = useState(null);
	initMercadoPago(import.meta.env.VITE_PUBLIC_KEY);

/*   async function getPaymentId(paymentId) {
    const response = await MercadoPago.payments.getPayment(paymentId);
    return response.body.id;
  } */

  let newCartMP = cart.map((prod) => {
    return {
      title: prod.name,
      unit_price: prod.price,
      quantity: prod.quantity,
    };
  });
	const createPreference = async () => {
		//mapear el carrito para devolver uno nuevo con la info que necesitemos

		console.log(newCartMP);
		try {
			const response = await axios.post(
				//"http://localhost:8080/create_preference",
				"https://backend-mp-audiophile.vercel.app/create_preference",
				newCartMP,
				
			); // como 2do parametro van los objetos del producto
			// pero debe llevar title, unit_price y quantity si o si.
	/* 		const descripcionFactura = await axios.post("https://backend-mp-audiophile.vercel.app/checkout/preference", {
				"statement_descriptor": "Audiophile - popito"
			})
				console.log("respuesta descripcion factura: ", descripcionFactura) */
			const { id } = response.data;
			return id;
		} catch (error) {
			console.log(error);
		}
	};

	const handleBuy = async () => {
		const id = await createPreference();
		if (id) {
			setPreferenceId(id); //guardo en el estado el id de la rta del backend
		}
	};



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

      preferenceId={preferenceId}
      cart={cart}
      handleBuy={handleBuy}
    />
  );
};

export default CheckoutContainer;
