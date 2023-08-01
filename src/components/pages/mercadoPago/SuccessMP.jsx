import { Typography } from "@mui/material";

const SuccessMP = ({ orderId, paramValue }) => {
	return (
		<div>
			<Typography>Amigo mandame una captura de esto si salio: </Typography>
			<Typography>El id de la orden es: {orderId}</Typography>
			<Typography>Y el status de la orden es: {paramValue}</Typography>
		</div>
	);
};

export default SuccessMP;
