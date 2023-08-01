import axios from "axios";
import Checkout from "./Checkout";
//import { useFormik } from "formik";
import { useState } from "react";
//import * as Yup from "yup";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useDispatch, useSelector } from "react-redux";
//import { MercadoPago } from "@mercadopago/sdk-react";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { clearCart } from "../../../store/cartSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const CheckoutContainer = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { cart, total } = useSelector((store) => store.cartSlice);
	//const { user } = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();

	/* const initialValues = {
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
	}; */

	/* const shouldShowError = (fieldName) => {
		//return (touched[fieldName] || submitCount > 0) && errors[fieldName];
		return Boolean(
			(touched[fieldName] || submitCount > 0) && errors[fieldName]
		);
	}; */

	/* const {
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
		onSubmit: async (data) => {
			//console.log("se envió el formulario", data);
			await handleBuy();

			console.log("PREFRENCE ID: ", preferenceId);

			//let idVenta = await getPaymentId(preferenceId);

			let ventaParaDB = {
				...data,
				idVenta: preferenceId,
				productosCommprados: newCartMP,
				cliente: user,
			};
			//Se esta creando y todavia no pago
			// deberia encontrar la forma de obtener que se realizo el pago para luego enviar el formulario

			/*    const productsCollection = collection(db, "ventas");
      await addDoc(productsCollection, ventaParaDB);

			//handleOpen()
			//setValues(initialValues);
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
	}); */

	// MERCADOPAGO LOGICA

	console.log("total a pagar ", total); // total sin sumarle el costo de envio

	//Los valores del form como no voy a usar el onSubmit, los guardo en un estado local:
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		adress: "",
		cp: "",
	});
	const [orderId, setOrderId] = useState(null); //guardo el id de la orden cuando se realiza la compra
	const [shipmentCost, setShipmentCost] = useState(null); //traigo de la DB la costo de envio
	const [pagando, setPagando] = useState(false); // registrando el onReady

	const handleChangeLocal = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	console.log("user Data es: ", userData);

	// PARAMETROS ---> los preparamos
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	console.log("Los queryParams son: ", queryParams);
	const paramValue = queryParams.get("status");

	const [preferenceId, setPreferenceId] = useState(null);
	initMercadoPago(import.meta.env.VITE_PUBLIC_KEY, { locale: "es-AR" });

	let newCartMP = cart.map((prod) => {
		return {
			title: prod.name,
			unit_price: prod.price,
			quantity: prod.quantity,
			currency_id: "ARS",
		};
	});

	useEffect(() => {
		let order = JSON.parse(localStorage.getItem("order")); //obtengo la orden de compra de LS
		if (paramValue === "approved" && order.name) {
			//evalua el parametro de la respuesta de MP y el nombre del comprador en localStorage
			let ordersCollections = collection(db, "orders");
			addDoc(ordersCollections, { ...order, date: serverTimestamp() }).then(
				//agrega un documento a orders
				(res) => {
					setOrderId(res.id); //setea e Id de la order de compra
				}
			);
			order.items.forEach((elemento) => {
				updateDoc(doc(db, "products", elemento.id), {
					stock: elemento.stock - elemento.quantity,
				});
			});
			localStorage.removeItem("order");
      dispatch(clearCart())
			//clearCart() // le tengo que pasar el dispatch para ejecutar el clearCart
		}
	}, [paramValue , clearCart ]);

	useEffect(() => {
		//con este useEffect traigo el costo de envio de la DB
		let refCollection = collection(db, "shipments");
		let refDoc = doc(refCollection, "Nt5wzoYC2zoo7IjNstNF");
		getDoc(refDoc).then((res) => setShipmentCost(res.data().cost));
	}, []);

	//Cuando hago click en el boton de elegir medio de pago
	const handleBuy = async () => {
		//preparo localstorage con info y creo la preferencia para MP.

		//validar los inputs
		//preparo lo que voy a guardar en localStorage
		let order = {
			name: userData.name,
			email: userData.email,
			items: cart,
			total,
		};

		localStorage.setItem("order", JSON.stringify(order));

		const id = await createPreference();
		if (id) {
			setPreferenceId(id); //guardo en el estado el id de la rta del backend
		}
	};

	const createPreference = async () => {
		//mapear el carrito para devolver uno nuevo con la info que necesitemos

		console.log(
			"newCartMP lo que guardo en items es lo que compra: ",
			newCartMP
		);
		try {
			const response = await axios.post(
				"http://localhost:8080/create_preference",
				//"https://backend-mp-audiophile.vercel.app/create_preference",
				{ items: newCartMP, shipment_cost: shipmentCost }
			); // como 2do parametro van los objetos del producto
			// pero debe llevar title, unit_price y quantity si o si.

			const { id } = response.data;
			return id;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Checkout
			/* handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleBlur={handleBlur}
			errors={errors}
			shouldShowError={shouldShowError}
			values={values} */
			handleChangeLocal={handleChangeLocal}
			handleClose={handleClose}
			open={open}
			handleOpen={handleOpen}
			preferenceId={preferenceId}
			cart={cart}
			handleBuy={handleBuy}
	
			setPagando={setPagando}
			orderId={orderId}
			pagando={pagando}
		/>
	);
};

export default CheckoutContainer;
