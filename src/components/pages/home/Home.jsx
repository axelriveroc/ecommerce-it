import { Button, Card, CardContent, Typography } from "@mui/material";

import imageBg from "../../../assets/home/desktop/image-hero.jpg";
import imgSpeaker1_desktop from "../../../assets/home/desktop/image-speaker-zx9.png";
import imgSpeaker2_desktop from "../../../assets/home/desktop/image-speaker-zx7.jpg";
import img3_desktop from "../../../assets/home/desktop/image-earphones-yx1.jpg";
import CardBringingContainer from "../../common/cardBringing/CardBringingContainer";
import CardTriple from "../../common/cardTriple/CardTriple";

const Home = () => {
  return (
    <div>
      <Card
        style={{
          backgroundImage: `url(${imageBg})`,
          backgroundColor: "rgb(25,25,25)",
          backgroundSize: "70% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
          width: "100%",
          height: "70vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: "0px",
        }}
      >
        <CardContent
          sx={{
            width: "50%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
            ml: 20,
            gap: 3,
          }}
        >
          <Typography
            sx={{
              color: "#FFF",
              fontSize: "14px",
              letterSpacing: "10px",
              opacity: "0.4963814914226532",
            }}
          >
            NEW PRODUCT
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "#FFF",
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: "58px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            XX99 Mark II Headphones
          </Typography>
          <Typography
            sx={{
              color: "#FFF",
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "25px",
              letterSpacing: "1px",
              opacity: 0.75,
              width: "60%",
            }}
          >
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </Typography>
          <Button variant="contained">SEE PRODUCT</Button>
        </CardContent>
      </Card>

      <CardTriple />

      <Card
        sx={{
          height: "560px",
          margin: "0 auto",
          borderRadius: "8px",
          backgroundColor: "#D87D4A",
          mt: 10,
          mb: 5,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "80%",
        }}
      >
        <img
          src={imgSpeaker1_desktop}
          alt=""
          style={{
            height: "450px",
            alignSelf: "flex-end",
            position: "relative",
            top: "10px",
          }}
        />
        <CardContent
          sx={{
            width: "30%",
            height: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            pt: 4,
          }}
        >
          <Typography
            sx={{
              color: "#FFF",
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: "58px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            ZX9 SPEAKER
          </Typography>
          <Typography
            sx={{
              color: "#FFF",
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "25px",
              opacity: 0.75,
            }}
          >
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </Typography>
          <Button
            sx={{
              backgroundColor: "secondary.main",
              color: "secondary.second",
              width: "50%",
              transition: "ease all 600ms",
              "&:hover": {
                backgroundColor: "secondary.second",
                color: "secondary.main",
              },
            }}
          >
            see product
          </Button>
        </CardContent>
      </Card>

      <Card
        sx={{
          backgroundImage: `url(${imgSpeaker2_desktop})`,
          width: "80%",
          height: "45vh",
          m: "0 auto",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "none",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <CardContent
          sx={{
            width: "30%",
            pl: 5,
            ml: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#000",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            ZX7 SPEAKER
          </Typography>
          <Button variant="outlined" color="secondary" sx={{ width: "60%" }}>
            see product
          </Button>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: "80%",
          m: "0 auto",
          mt: 5,
          display: "flex",
          justifyContent: "space-between",
          gap: 5,
          boxShadow:"none"
        }}
      >
        <img
          src={img3_desktop}
          alt=""
          style={{
            width: "45%",
            height: "50vh",
          }}
        />
        <CardContent
          sx={{
            backgroundColor: "#f1f1f1",
            width: "45%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"flex-start",
            gap:5,
            pl:10
          }}
        >
          <Typography
            sx={{
              color: "#000",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            YX1 EARPHONES
          </Typography>
          <Button color="secondary" variant="outlined" sx={{width:"40%"}}>see product</Button>
        </CardContent>
      </Card>

      <CardBringingContainer />
    </div>
  );
};

export default Home;
