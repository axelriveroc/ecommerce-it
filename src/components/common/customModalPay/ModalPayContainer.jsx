import ModalPay from "./ModalPay"
const ModalPayContainer = ({order}) => {
  //const { cart, total } = useSelector((store) => store.cartSlice);

  //<ModalPay open={open} handleClose={handleClose} cart={cart} total={total} />;
  return (
    <ModalPay  order={order} />
  );
};

export default ModalPayContainer