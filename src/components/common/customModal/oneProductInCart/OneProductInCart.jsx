import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  decrementQ,
  incrementQ,
  removeById,
} from "../../../../store/cartSlice";

import DeleteIcon from "@mui/icons-material/Delete";

const styles = {
  boxProduct: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap:{md:.5, sm:0.2,},
  },
  box2: {
    display: "flex",
    width: {md:"35%", sm:"30%"},
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    p: {md:1, sm:.5, xs:.5},
  },
  boton: {
    minWidth: "20px",
    height: "20px",
    color: "primary",
    fontWeight:"bold",
    fontSize:"1.5rem"
          
  },
  nameProd: {
    textTransform: "uppercase",
    fontWeight: "bold",
    lineHeight: "25px",
    letterSpacing: 1,
  },
  price: {
    color: "#000",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "25px",
    opacity: 0.5,
  },
};

const OneProductInCart = ({ item, dispatch }) => {
  

  return (
    <Box sx={styles.boxProduct}>

      <Box sx={styles.boxProduct}>

      
      <IconButton
        onClick={() => dispatch(removeById(item.id))}
        sx={{ color: "primary.main" }}
      >
        <DeleteIcon />
      </IconButton>

      <img
        src={item.image.url}
        width={70}
        height={70}
        style={{ borderRadius: "8px" }}
      />

      <div>
        <Typography variant="body1" sx={styles.nameProd}>
          {item.subname}
        </Typography>
        <Typography variant="body2" sx={styles.price}>
          ${item.price}
        </Typography>
      </div>
      
      </Box>

      <Box sx={styles.box2}>
        <Button
          sx={styles.boton}
          onClick={() => dispatch(decrementQ(item.id))}
          disabled={item.quantity > 1 ? false : true}
        >
          -
        </Button>
        <Typography>{item.quantity}</Typography>
        <Button
          sx={styles.boton}
          onClick={() => dispatch(incrementQ(item.id))}
          disabled={item.quantity < item.stock ? false : true}
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

export default OneProductInCart;
