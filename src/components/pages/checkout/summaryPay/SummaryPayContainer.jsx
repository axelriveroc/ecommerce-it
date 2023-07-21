import { useSelector } from "react-redux"
import SummaryPay from "./SummaryPay"

const SummaryPayContainer = () => {

    const { cart, total } = useSelector(store => store.cartSlice);
  return (
    <SummaryPay cart={cart} total={total}  />
  )
}

export default SummaryPayContainer