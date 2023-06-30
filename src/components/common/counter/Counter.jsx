import { Box, Button, Typography } from "@mui/material";
/* import { useEffect, useState } from "react";
 */
const styles={
  box1: {
        display: "flex",
        width: "90%",
        justifyContent: "flex-start",
        gap:2
      },
      box2: {
          display: "flex",
          width: "35%",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:"#f1f1f1",
          p:1,
        },
        boton: {
            color: "primary",
            minWidth: "20px",
            height: "20px",
            fontWeight:"bold",
            fontSize:"1.5rem"
          }

}

const Counter = ({ onAdd, counter, setCounter, product , /* cart */ }) => {

/*   const [ productQInCart, setProductQInCart ] = useState(0)

  useEffect(() => {
    const productFinded = cart.find((p) => p.id === product.id);
    if (productFinded) {
      setProductQInCart(productFinded.quantity);
    }
  }, [cart, product.id]);

  console.log("cantidad de este producto en el carrito: " , productQInCart)  */
  return (
    <Box
      sx={styles.box1}
    >
      <Box
        sx={styles.box2}
      >
        <Button
          sx={styles.boton}
          onClick={() => setCounter(counter - 1)}
          disabled={ counter > 1 ? false : true} 
        >
          -
        </Button>
        <Typography variant="body2" sx={{fontWeight: "bold"}}>{counter}</Typography>
        <Button
          sx={styles.boton}
          onClick={() => setCounter(counter + 1)}
         disabled={ counter < product.stock ? false : true  }
          // counter < (product.stock - productInCart.quantity)
        >
          +
        </Button>
      </Box>

      <Button
        sx={{
          width: "160px",
        }}
        variant="contained"
        onClick={() => onAdd(counter)}
      >
        Add To Cart
      </Button>
    </Box>
  );
};

export default Counter;
