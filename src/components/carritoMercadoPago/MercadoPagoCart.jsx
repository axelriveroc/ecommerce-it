import { Wallet } from "@mercadopago/sdk-react";


const MercadoPagoCart = ({preferenceId}) => {

	const customization = {
		texts: {
			action: "buy", // Puedes cambiar 'buy' por 'pay' si prefieres el texto predeterminado en español 'Paga con Mercado Pago.'
			valueProp: "security_details", // Puedes cambiar 'security_details' por otras opciones disponibles según lo desees.
		},
		visual: {
			buttonBackground: "default",
			borderRadius: "6px",
		},
		checkout: {
			theme: {
				elementsColor: "#D87D4A",
				headerColor: "#D87D4A",
			},
		},
		locale: "es-ES",
	};
	return (
		<div>
			
			{preferenceId && (
				<Wallet
					customization={customization}
					initialization={{ preferenceId, redirectMode: "modal" }}
					onReady={() => { console.log("callback de wallet: onReady")}}
					onError={() => { console.log("callback de wallet: onError")}}
					onSubmit={() => { console.log("callback de wallet: onSubmit")}}
				/>
			)}
			{/* wallet es la pagina que me redirije, pero para eso necesitamos que el preferenceId esté 
      por eso inicializa con null. 
      y para usar la prop initialization le tengo que pasar el id de preferencia que me devolvio el backend. */}
		</div>
	);
};

export default MercadoPagoCart;
