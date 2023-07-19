
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "./CustomModal";
import { useEffect } from "react";
import { getTotalPrice } from "../../../store/cartSlice";




const CustomModalContainer = ({open, handleClose }) => {

  const dispatch = useDispatch();
  const {cart, total} = useSelector(store => store.cartSlice);

  useEffect(()=>{
    dispatch(getTotalPrice())
  }, [cart, dispatch])


  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      cart={cart}
      dispatch={dispatch}
      totalPrice={total}
    />
  );
}

export default CustomModalContainer