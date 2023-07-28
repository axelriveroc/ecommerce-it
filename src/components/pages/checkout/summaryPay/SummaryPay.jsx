import { Box, Button, Typography } from "@mui/material";
import "./SummaryPayStyle.css"
import MercadoPagoCart from "../../../carritoMercadoPago/MercadoPagoCart";

const styles = {
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

const SummaryPay = ({ cart, total }) => {
	console.log(cart);

	return (
    <Box
      sx={{
        width: { md: "40%", sm: "90%" },
        height:"50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1,
        p: 2,
        backgroundColor:"#ffffff",
        borderRadius:"8px",
        border:"none",
        boxShadow:"none",
        mb:2,
        mt:2,
      }}
    >
      SUMMARY
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {cart.map((item) => (
          <Box
            key={item.id}
            sx={{ display: "flex", alignItems: "center", p:1 }}
          >
            <Box
              sx={{
                display: "flex",
                width: "80%",
                alignItems: "center",
                gap: 1,
              }}
            >
              <img
                src={item.image.url}
                width={65}
                height={65}
                style={{ borderRadius: "8px" }}
              />

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={styles.nameProd}>
                  {item.subname}
                </Typography>
                <Typography variant="body2" sx={styles.price}>
                  ${item.price}
                </Typography>
              </Box>
            </Box>
            <div style={{ alignSelf: "flex-start" }}>
              <Typography>x{item.quantity}</Typography>
            </div>
          </Box>
        ))}
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,p:1	  
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography>TOTAL: </Typography>
          <span>${total}</span>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>SHIPPING: </Typography>
          <span>${(total * 0.15).toFixed(2)}</span>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>VAT(included): </Typography>
          <span>${(total * 0.21).toFixed(2)}</span>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>GRAND TOTAL:</Typography>
          <span className="grandTotal">
            ${(total * 0.21 + total * 0.15 + total).toFixed(2)}
          </span>
        </Box>
      </Box>
      <Button variant="contained" type="submit">
        Continuea & pay
      </Button>
      <MercadoPagoCart />
    </Box>
  );
};

export default SummaryPay;
