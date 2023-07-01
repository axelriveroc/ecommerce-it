import { Box, Button, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { clearCart } from "../../../store/cartSlice";
import OneProductInCart from "./oneProductInCart/OneProductInCart";

const styles = {
  box1: {
    position: "absolute",
    top: "45%",
    right: "0%",
    transform: "translate(-25%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    minHeight: "400px",
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
          <Button onClick={() => dispatch(clearCart())}>Remove All</Button>
          {cart.map((item) =>  <OneProductInCart item={item} key={item.id} dispatch={dispatch} /> )}
          <div>
            <h5>total: </h5>
            <h5>{totalPrice}</h5>
          </div>
          <Link to="/checkout">
            <Button variant="contained" onClick={handleClose}>
              CheckOut
            </Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
