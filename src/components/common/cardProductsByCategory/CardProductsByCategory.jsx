import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CardProductsByCategory = ({ product, index }) => {
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
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        border: "none",
        boxShadow: "none"
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
        <Link to={`/productDetail/${product.id}`}>
          <br />
          <Button variant="contained">SEE PRODUCT</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
export default CardProductsByCategory;
