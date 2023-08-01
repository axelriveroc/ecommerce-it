import { useSelector } from "react-redux";
import SummaryPay from "./SummaryPay";

const SummaryPayContainer = ({
	preferenceId,
	cart,
	handleBuy,
	setPagando,
	pagando, orderId
}) => {
	const { total } = useSelector((store) => store.cartSlice);
	return (
		<SummaryPay
			cart={cart}
			total={total}
			preferenceId={preferenceId}
			handleBuy={handleBuy}
			setPagando={setPagando}
			orderId={orderId}
      pagando={pagando}
		/>
	);
};

export default SummaryPayContainer;
