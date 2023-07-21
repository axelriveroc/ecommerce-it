import { useSelector } from "react-redux";
import ModalPay from "./ModalPay"
const ModalPayContainer = ({ open, handleClose }) => {

  const { cart , total } = useSelector(store => store.cartSlice);

  return <ModalPay open={open} handleClose={handleClose} cart={cart} total={total} />;
};

export default ModalPayContainer