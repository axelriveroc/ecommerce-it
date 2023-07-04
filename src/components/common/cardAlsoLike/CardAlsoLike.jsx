import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import img1 from "../../../assets/product-xx99-mark-two-headphones/tablet/image-product.jpg";
import img2 from "../../../assets/product-yx1-earphones/tablet/image-product.jpg";
import img3 from "../../../assets/product-zx7-speaker/tablet/image-product.jpg";

const useStyles = {
  container: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    height:{sm:"90vh"},
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    /* padding: "16px", */
    border: "none",
    boxShadow: "none",
    borderRadius: "8px",
    height:"100%",
    
  },
  media: {
    backgroundColor: "#f1f1f1",
    width: "100%",
    height: "315px",
    marginBottom: "16px",
  },
  CardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 3,
  },
  typography: {
    fontSize: "24px",
    fontFamily: "Manrope",
    fontWeight: 700,
    letterSpacing: "1.714px",
    textTransform: "uppercase",
  },
};

const CardAlsoLike = () => {
  return (
    <Grid container  sx={useStyles.container}>
      <Grid item xs={12} sm={4} sx={{height:"100%",p:1}}>
        <Card sx={useStyles.card}>
          <CardMedia
            sx={useStyles.media}
            component="img"
            src={img1}
            alt="Imagen 2"
          />
          <CardContent sx={useStyles.CardContent}>
            <Typography variant="h6" sx={useStyles.typography}>
              xx99 mark II 
            </Typography>
            <Button variant="contained" color="primary">
              See Product
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4} sx={{height:"100%", p:1}}>
        <Card sx={useStyles.card}>
          <CardMedia
            sx={useStyles.media}
            component="img"
            src={img2}
            alt="Imagen 2"
          />
          <CardContent sx={useStyles.CardContent}>
            <Typography variant="h6" sx={useStyles.typography}>
              yx1 earphone
            </Typography>
            <Button variant="contained" color="primary">
              See Product
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4} sx={{height:"100%", p:1}}>
        <Card sx={useStyles.card}>
          <CardMedia
            sx={useStyles.media}
            component="img"
            src={img3}
            alt="Imagen 2"
          />
          <CardContent sx={useStyles.CardContent}>
            <Typography variant="h6" sx={useStyles.typography}>
            zx7 speaker
            </Typography>
            <Button variant="contained" color="primary">
              See Product
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CardAlsoLike;
