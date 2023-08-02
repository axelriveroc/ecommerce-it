import { Typography } from "@mui/material";
import ModalPayContainer from "../../common/customModalPay/ModalPayContainer";

const SuccessMP = ({ orderId, paramValue }) => {
	return (
		<div>
			<Typography>El id de la orden es: {orderId}</Typography>
			<Typography>Y el status de la orden es: {paramValue}</Typography>
			<ModalPayContainer />
		</div>
	);
};

export default SuccessMP;
