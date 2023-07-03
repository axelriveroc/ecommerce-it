import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./CardProductsByCategoryStyle.css";

const CardProductsByCategory = ({ product, index }) => {
  return (
    <Card
      sx={{
        width: "90%",
        height: { md: "80vh", sm: "90vh" },
        margin: "0 auto",
        display: "flex",
        flexDirection: {
          md: index % 2 === 0 ? "row" : "row-reverse",
          sm: "column",
          xs: "column",
        },
        alignItems: "center",
        justifyContent: "space-around",
        mt: "20px",
        mb: "25px",
        /*  border: "none", */
        boxShadow: "none",
        border: "solid red",
      }}
    >
      <img src={product.image} alt="" className="img_product" />
      <CardContent
        sx={{
          height: "70%",
          width: { md: "35%", sm: "80%", xs: "90%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: { sm: "center", md: "flex-start", xs: "center" },
          /* gap: "15px", */
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#000",
            fontSize: {md:"40px", sm:"40px", xs:"30px"},
            fontFamily: "Manrope",
            fontWeight: 700,
            lineHeight: "44px",
            letterSpacing: "1.429px",
            textTransform: "uppercase",
            textAlign: { md: "start", sm: "center", xs: "center" },
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#000",
            fontSize: {md:"15px", sm:"15px", xs:"12px"},
            fontFamily: "Manrope",
            fontWeight: 500,
            lineHeight: "25px",
            opacity: 0.5,
            textAlign: { md: "start", sm: "center", xs: "center" },
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
