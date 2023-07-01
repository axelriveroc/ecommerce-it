import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  decrementQ,
  incrementQ,
  removeById,
} from "../../../../store/cartSlice";

import DeleteIcon from "@mui/icons-material/Delete";

const styles = {
  box2: {
    display: "flex",
    width: "35%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    p: 1,
  },
  boton: {
    color: "secondary.main",
    opacity: "0.25",
    minWidth: "20px",
    height: "20px",
  },
};

const OneProductInCart = ({ item, dispatch }) => {
  console.log(item)
  return (
    <Box sx={{ border: "solid blue", display: "flex" }}>
      <IconButton onClick={() => dispatch(removeById(item.id))}>
        <DeleteIcon />
      </IconButton>

      <div>
        <h3>{item.slug}</h3>
        <h4>${item.price}</h4>
      </div>

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
