import { useSelector } from "react-redux";
import SummaryPay from "./SummaryPay";

const SummaryPayContainer = ({ preferenceId, cart, handleBuy, setPreferenceId }) => {
	const { total } = useSelector((store) => store.cartSlice);
	return (
		<SummaryPay
			cart={cart}
			total={total}
			preferenceId={preferenceId}
			handleBuy={handleBuy}
      setPreferenceId={setPreferenceId}
		/>
	);
};

export default SummaryPayContainer;
