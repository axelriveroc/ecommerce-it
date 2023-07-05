import { Box, Button, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { clearCart } from "../../../store/cartSlice";
import OneProductInCart from "./oneProductInCart/OneProductInCart";

const styles = {
  box1: {
    position: "absolute",
    top: {md:"45%", sm:"45%", xs:"45%"},
    bottom:{xs:"20%", md:"0%"},
    left:{xs:"30%", md:"65%", sm:"55%"},
    transform: "translate(-25%, -50%)",
    width: {md:400 , xs:290, sm:350},
    bgcolor: "background.paper",
    borderRadius: "8px",
    background: "#FFF",
    boxShadow: 24,
    p: {md:3, sm:3, xs:2},
    /* minHeight: "fit-content", */
    minHeight:"80vh",
    display: "flex",
    flexDirection: "column",
    aligItems: "center",
    justifyContent: "space-between",
  },
  boxHeader:{ display: "flex", alignItems:"center", justifyContent:"space-between" },
  cartLength: {
    color: "#000",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    letterSpacing: "1.286px",
    textTransform: "uppercase",
  },
  removeAll: {
    color: "#000",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "25px",
    textDecorationLine: "underline",
    opacity: 0.5,
    textTransform: "none",
  },
  boxProducts: {
    display: "flex",
    flexDirection: "column",
    aligItems: "center",
    justifyContent: "space-between",
    gap: 2,
    overflow:"auto",

  },
  totalPrice: {
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "25px",
    opacity: 0.5,
    textTransform: "uppercase",
  },
  price: {
    fontSize: "18px",
    color: "#000",
    fontWeight: 700,
    lineHeight: "normal",
  },
};

const CustomModal = ({ open, handleClose, cart, dispatch, totalPrice }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.box1}>
          <Box sx={styles.boxHeader}>
            <Typography sx={styles.cartLength}> CART ({cart.length})</Typography>
            <Button sx={styles.removeAll} onClick={() => dispatch(clearCart())}>
              Remove all
            </Button>
          </Box>

          <Box sx={styles.boxProducts}>
            {cart.map((item) => (
              <OneProductInCart item={item} key={item.id} dispatch={dispatch} />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <Typography variant="body2" sx={styles.totalPrice}>
              total:{" "}
            </Typography>
            <Typography variant="body2" sx={styles.price}>
              ${totalPrice.toLocaleString("en-US")}
            </Typography>
          </Box>

          <Link to="/checkout">
            <Button variant="contained" onClick={handleClose} fullWidth>
              CheckOut
            </Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
