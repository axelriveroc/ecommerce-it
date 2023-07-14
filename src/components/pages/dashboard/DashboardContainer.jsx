import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const DashboardContainer = () => {
  const [productsList, setProductsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      let refCollection = collection(db, "products");
      let res = await getDocs(refCollection);

      let productosFinales = res.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        };
      });
      setProductsList(productosFinales);
    })();
  }, []);

  const viewByID = (product) => {
    setOpen(true);
    setDisabled(true);
    setData(product);
  };
  const editByID = (product) => {
    setOpen(true);
    setDisabled(false);
    setData(product);
  };
  const deleteByID = () => {};

  const props = {
    viewByID,
    editByID,
    deleteByID,
    productsList,
    open,
    handleClose,
    disabled,
    data
  };

  return <Dashboard {...props} />;
};

export default DashboardContainer;
