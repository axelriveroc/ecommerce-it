import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { db } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import Success from "../../common/success/Success";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [shipmentCost, setShipmentCost] = useState(null)

  const [pagando, setPagando] = useState(false);

  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago(import.meta.env.VITE_PUBLICKEY, { locale: "es-AR" });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const total = getTotalPrice();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("status");

  useEffect(() => {
    let order = JSON.parse(localStorage.getItem("order"));
    if (paramValue === "approved" && order.name) {
      let ordersCollections = collection(db, "orders");
      addDoc(ordersCollections, { ...order, date: serverTimestamp() }).then(
        (res) => {
          setOrderId(res.id);
        }
      );
      order.items.forEach((elemento) => {
        updateDoc(doc(db, "products", elemento.id), {
          stock: elemento.stock - elemento.quantity,
        });
      });
      localStorage.removeItem("order");
      clearCart()
    }
  }, [paramValue, clearCart]);

  useEffect(()=>{
    let refCollection = collection(db, "shipments")
    let refDoc = doc(refCollection, "mbPzY8utYEsVzUxFahJz")
    getDoc(refDoc).then(res=> setShipmentCost(res.data().cost))
  },[])

  const createPreference = async () => {
    const newArr = cart.map((product) => {
      return {
        title: product.title,
        unit_price: product.unit_price,
        quantity: product.quantity,
      };
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/create_preference",
        {
          items: newArr,
          shipment_cost: shipmentCost,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    let order = {
      name: userData.name,
      email: userData.email,
      items: cart,
      total,
    };
    localStorage.setItem("order", JSON.stringify(order));
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div>
      <Typography variant="h4" color={"primary"} align="center" pb={2}>
        Terminar compra
      </Typography>
      {!pagando && !orderId && (
        <div>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            alignItems="center"
            justifyContent={"center"}
          >
            <Grid item xs={10} md={5}>
              <TextField
                name="name"
                label="Nombre completo"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          
            <Grid item xs={10} md={5}>
              <TextField
                name="adress"
                label="Direccion"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                name="cp"
                label="Codigo postal"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                name="phone"
                label="Telefono"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} md={5}></Grid>
            <Grid item xs={10}>
              <Button
                variant="contained"
                onClick={handleBuy}
                sx={{ marginTop: "20xp" }}
              >
                Seleccione metodo de pago
              </Button>
            </Grid>
          </Grid>
        </div>
      )}

      {preferenceId && (
        <Wallet
          initialization={{ preferenceId }}
          onReady={() => setPagando(true)}
        />
      )}
      {orderId && <Success orderId={orderId} />}
    </div>
  );
};

export default Checkout;