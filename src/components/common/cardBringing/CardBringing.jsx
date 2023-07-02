import { Card, CardContent, Typography } from "@mui/material";
import imgBringing from "../../../assets/shared/desktop/image-best-gear.jpg";
import imgBringing_tablet from "../../../assets/shared/tablet/image-best-gear.jpg";
import { customTheme } from "../../../ThemeConfig";
import "../../pages/home/HomeStyle.css"

const CardBringing = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column-reverse" },
        alignItems: "center",
        width: { md: "80%", xs: "95%" },
        justifyContent: "space-around",
        m: { md: "40px auto", xs: "0 auto" },
        mt:{xs:8},
        boxShadow: "none",
        height:"80vh"
      }}
    >
      <CardContent
        sx={{
          /* p: { xs: "30px" }, */
          height: "100%",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          width:{sm:"80%"}
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontSize: { md: "40px", sm:"35px", xs: "30px" },
            fontWeight: "bold",
            lineHeight: "44px",
            letterSpacing: "1.429px",
            textTransform: "uppercase",
            pb: { md: 3, sm:1, xs: 1 },
            textAlign: { md: "start",sm:"center", xs: "center" },
          }}
        >
          Bringing you the{" "}
          <span style={{ color: customTheme.palette.primary.main }}>best</span>{" "}
          audio gear
        </Typography>
        <Typography
          sx={{
            color: "#000",
            fontSize: {md:"15px", xs:"12px"},
            fontWeight: 500,
            lineHeight: "25px",
            opacity: {md:0.5, sm:0.5, xs:1},
            textAlign: { md: "start", sm:"center", xs: "center" },
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
      <img src={imgBringing} alt="" className="img_bringing" />
      <img src={imgBringing_tablet}  className="img_briging_tablet" />
    </Card>
  );
};

export default CardBringing;
