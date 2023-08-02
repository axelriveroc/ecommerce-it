import { useSelector } from "react-redux";
import ModalPay from "./ModalPay"
const ModalPayContainer = () => {
  const { cart, total } = useSelector((store) => store.cartSlice);

  //<ModalPay open={open} handleClose={handleClose} cart={cart} total={total} />;
  return (
    <ModalPay  cart={cart} total={total} />
  );
};

export default ModalPayContainer