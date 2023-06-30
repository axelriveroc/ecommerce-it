import { Card, CardContent, Typography } from "@mui/material";
import CounterContainer from "../counter/CounterContainer";

const styles = {
  card: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    mt: "20px",
    mb: "25px",
    border: "none",
    boxShadow: "none",
  },
  image: {
    width: "420px",
    height: "430px",
    flexShrink: 0,
    borderRadius: "8px",
    background: "#F1F1F1",
  },
  cardContent: {
    height: "100%",
    width: "35%",
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

const CardOneProductDetail = ({ product, onAdd, /* cart */ }) => {
  return (
    <Card
      sx={styles.card}
    >
      <img
        src={product.image}
        alt=""
        style={styles.image}
      />
      <CardContent
        sx={styles.cardContent}
      >
        <Typography
          sx={styles.newProduct}
        >
          {product.new && "NEW PRODUCT"}
        </Typography>

        <Typography
          variant="h4"
          sx={styles.productName}
        >
          {product.name}
        </Typography>
        <Typography
          variant="p"
          sx={styles.productDescription}
        >
          {product.description}
        </Typography>

        <Typography>
          ${product.price && product.price.toLocaleString("en-US")}
        </Typography>

        <CounterContainer onAdd={onAdd} product={product} /* cart={cart} */ />
      </CardContent>
    </Card>
  );
};

export default CardOneProductDetail;
