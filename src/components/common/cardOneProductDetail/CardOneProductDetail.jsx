import { Card, CardContent, Typography } from "@mui/material";
import CounterContainer from "../counter/CounterContainer";
import "./CardOneStyle.css";


const styles = {
  card: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    flexDirection:{md:"row",sm:"row",xs:"column"},
    justifyContent: {md:"space-around", sm:"space-evenly"},
    mt: "20px",
    mb: "25px",
    height: {md:"80vh", sm:"80vh", xs:"120vh"} , 
    border: "none",
    boxShadow: "none",
  },
  cardContent: {
    height: "100%",
    width: {md:"35%", sm:"50%"},
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: "15px",
  },
  newProduct: {
    color: "#D87D4A",
    fontSize: "14px",
    letterSpacing: "10px",
    textTransform: "uppercase",
  },
  productName: {
    color: "#000",
    fontSize: "40px",
    fontFamily: "Manrope",
    fontWeight: 700,
    lineHeight: "44px",
    letterSpacing: "1.429px",
    textTransform: "uppercase",
  },
  productDescription: {
    color: "#000",
    fontSize: "15px",
    fontFamily: "Manrope",
    fontWeight: 500,
    lineHeight: "25px",
    opacity: 0.5,
  },
};

const CardOneProductDetail = ({ product, onAdd, quantityInCart }) => {
  return (
    <Card sx={styles.card}>

      <img src={product.image} alt="" className="image_cardOne" />

      <CardContent sx={styles.cardContent}>
        <Typography sx={styles.newProduct}>
          {product.new && "NEW PRODUCT"}
        </Typography>

        <Typography variant="h4" sx={styles.productName}>
          {product.name}
        </Typography>
        <Typography variant="p" sx={styles.productDescription}>
          {product.description}
        </Typography>

        <Typography>
          ${product.price && product.price.toLocaleString("en-US")}
        </Typography>

        <CounterContainer
          onAdd={onAdd}
          product={product}
          quantityInCart={quantityInCart}
        />
      </CardContent>

    </Card>
  );
};

export default CardOneProductDetail;
