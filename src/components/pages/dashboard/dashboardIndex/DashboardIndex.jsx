import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import GeneralStadistics from "./estadisticasGenerales/GeneralStadistics";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import "./estadisticasGenerales/GeneralStadisticsStyle.css";

const DashboardIndex = () => {
  const { user } = useSelector((store) => store.authSlice);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [changesProducts, setChangesProducts] = useState(false);
  const [changesUsers, setChangesUsers] = useState(false);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      let getProducts = querySnapshot.docs.map((prod) => {
        return {
          ...prod.data(),
          id: prod.id,
        };
      });
      setProducts(getProducts);
    })();
  }, [changesProducts]);
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      let getUsers = querySnapshot.docs.map((user) => {
        return {
          ...user.data(),
          id: user.id,
        };
      });
      setUsers(getUsers);
    })();

    console.log(users);
  }, [changesUsers]);

  console.log("ususarios: ", users);
  console.log("productos: ", products);
  return (
    <div>
      <Typography variant="h3" color={"white"} className="welcomeMessage" sx={{textAlign:"center"}}>
        Bienvenido <span className="spanloco">{user.displayName.toUpperCase()} </span>
      </Typography>
      <GeneralStadistics
        users={users}
        products={products}
        setChangesProducts={setChangesProducts}
        setChangesUsers={setChangesUsers}
      />
    </div>
  );
};

export default DashboardIndex;
