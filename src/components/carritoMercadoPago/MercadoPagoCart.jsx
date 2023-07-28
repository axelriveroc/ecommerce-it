import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const MercadoPagoCart = () => {
	const [preferenceId, setPreferenceId] = useState(null);
	initMercadoPago(import.meta.env.VITE_PUBLIC_KEY);

	const createPreference = async () => {
		//mapear el carrito para devolver uno nuevo con la info que necesitemos
		try {
			const response = await axios.post(
				//"http://localhost:8080/create_preference",
                "https://backend-mp-audiophile.vercel.app/create_preference",
				[
					{
						title: "zapatilla nike",
						unit_price: 5,
						quantity: 3,
					},
					{
						title: "zapatilla nilo",
						unit_price: 20,
						quantity: 2,
					},
				]
			); // como 2do parametro van los objetos del producto
			// pero debe llevar title, unit_price y quantity si o si.

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
		<div>
			<button onClick={handleBuy} type="button"> {/* Esto deberia ir en la fx onsubmit */}
				Comprar
			</button>
			{preferenceId && <Wallet initialization={{ preferenceId }} />}
			{/* wallet es la pagina que me redirije, pero para eso necesitamos que el preferenceId esté 
      por eso inicializa con null. 
      y para usar la prop initialization le tengo que pasar el id de preferencia que me devolvio el backend. */}
		</div>
	);
};

export default MercadoPagoCart;
