import { Typography } from "@mui/material";
import ModalPayContainer from "../../common/customModalPay/ModalPayContainer";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useEffect, useState } from "react";

const SuccessMP = ({ orderId, paramValue }) => {
  // deberia traerme de la DB la orden a partir de orderId
  const [order, setOrder] = useState({});
  //TRAERME DE LA DB LA ORDEN Y EL DETALLE:
  useEffect(() => {
    let refCollection = collection(db, "orders");
    let refDoc = doc(refCollection, orderId);
    getDoc(refDoc).then((res) => setOrder({ ...res.data(), id: res.id }));
  }, [orderId]);

  return (
    <div>
      <Typography>El id de la orden es: {orderId}</Typography>
      <Typography>Y el status de la orden es: {paramValue}</Typography>
      <ModalPayContainer order={order} />
    </div>
  );
};

export default SuccessMP;
