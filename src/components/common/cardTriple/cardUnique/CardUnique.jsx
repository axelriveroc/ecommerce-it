import { Box, Button, CardContent, Typography } from "@mui/material";
import flecha from "../../../../assets/shared/desktop/icon-arrow-right.svg";
const stylesCardContext = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "40%",
  height: "100%",
  p: 0,
  position: "relative",
  boxShadow: "none",
  border: "none",
};
const stylesIMG = {
  width: "350px",
  height: "300px",
  position: "absolute",
  bottom: 40,
  zIndex: 4,
};
const stylesBox = {
  width: "100%",
  height: "55%",
  borderRadius: "8px",
  backgroundColor: "#F1F1F1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  position: "absolute",
  bottom: 0,
  pb: 2.5,
};
const stylesTitle = {
  color: " #000",
  textAlign: "center",
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "1.286px",
  textTransform: "uppercase",
};
const stylesButton = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  gap: 10,
  alignItems: "center",
};
const stylesShop = {
  color: "#000",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "1px",
  textTransform: "uppercase",
};

const CardUnique = ({ product }) => {
  return (
    <CardContent sx={stylesCardContext}>
      <img src={product.img} alt="" style={stylesIMG} />

      <Box sx={stylesBox}>
        <Typography sx={stylesTitle}>{product.title}</Typography>
        <Button style={stylesButton}>
          <Typography sx={stylesShop}>SHOP</Typography>
          <img src={flecha} alt="" style={{ width: "5px", height: "10px" }} />
        </Button>
      </Box>
    </CardContent>
  );
};

export default CardUnique;
