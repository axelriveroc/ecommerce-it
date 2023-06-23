import { Card, CardContent, Typography } from "@mui/material";
import imgBringing from "../../../assets/shared/desktop/image-best-gear.jpg";
import { customTheme } from "../../../ThemeConfig";

const CardBringing = () => {
  return (
    <Card sx={{
        display:"flex",
        alignItems:"center",
        width:"80%",
        justifyContent:"space-around",
        margin: "40px auto",
        boxShadow: "none"
    }}>
      <CardContent sx={{
        p: "50px",
        height: "100%"
      }}>
        <Typography
          sx={{
              color: "#000",
            fontSize: "40px",
            fontWeight: "bold",
            lineHeight: "44px",
            letterSpacing: "1.429px",
            textTransform: "uppercase",
            pb: 10
          }}
        >
          Bringing you the{" "}
          <span style={{ color: customTheme.palette.primary.main }}>best</span>{" "}
          audio gear
        </Typography>
        <Typography
          sx={{
            color: "#000",
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: "25px",
            opacity: 0.5,
        }}
        >
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </Typography>
      </CardContent>
        <img
          src={imgBringing}
          alt=""
          style={{ width: "540px", height: "590px" }}
        />
    </Card>
  );
};

export default CardBringing;
