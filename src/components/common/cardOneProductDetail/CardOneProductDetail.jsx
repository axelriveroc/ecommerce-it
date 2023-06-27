import { Card, CardContent, Typography } from "@mui/material";
import CounterContainer from "../counter/CounterContainer";

const CardOneProductDetail = ({ product, onAdd }) => {
  return (
    <Card
      sx={{
        width: "90%",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        mt: "20px",
        mb: "25px",
        border: "none",
        boxShadow: "none",
      }}
    >
      <img
        src={product.image}
        alt=""
        style={{
          width: "420px",
          height: "430px",
          flexShrink: 0,
          borderRadius: "8px",
          background: "#F1F1F1",
        }}
      />
      <CardContent
        sx={{
          height: "100%",
          width: "35%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          gap: "15px",
        }}
      >
        <Typography
          sx={{
            color: "#D87D4A",
            fontSize: "14px",
            letterSpacing: "10px",
            textTransform: "uppercase",
          }}
        >
          {product.new && "NEW PRODUCT"}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#000",
            fontSize: "40px",
            fontFamily: "Manrope",
            fontWeight: 700,
            lineHeight: "44px",
            letterSpacing: "1.429px",
            textTransform: "uppercase",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#000",
            fontSize: "15px",
            fontFamily: "Manrope",
            fontWeight: 500,
            lineHeight: "25px",
            opacity: 0.5,
          }}
        >
          {product.description}
        </Typography>

        <Typography>
          ${product.price && product.price.toLocaleString("en-US")}
        </Typography>

        <CounterContainer onAdd={onAdd} />
      </CardContent>
    </Card>
  );
};

export default CardOneProductDetail;
