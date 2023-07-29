import { useSelector } from "react-redux";
import SummaryPay from "./SummaryPay";

const SummaryPayContainer = ({ preferenceId, cart, handleBuy }) => {
	const { total } = useSelector((store) => store.cartSlice);
	return (
		<SummaryPay
			cart={cart}
			total={total}
			preferenceId={preferenceId}
			handleBuy={handleBuy}
		/>
	);
};

export default SummaryPayContainer;
