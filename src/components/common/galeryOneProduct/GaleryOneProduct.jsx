import { Card, CardMedia, Grid } from "@mui/material";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width:"100%",
    border:"none",
    boxShadow:"none"
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    flexGrow: 1,
    marginBottom: "8px",
    border:"none",
    boxShadow:"none",
    borderRadius:"10px"
  },
};

const GaleryOneProduct = ({ product }) => {
  if (!product || !product.gallery || !product.gallery.first) {
    // Manejar el caso cuando 'product', 'gallery' o 'first' no están definidos
    return null;
  }


  return (
    <Grid
      container
      spacing={1}
      sx={{
        width: "80%",
        m: "0 auto",
        justifyContent: "space-evenly",
      }}
    >
      <Grid item xs={12} sm={5} >
        <Card sx={styles.root}>
          <div style={styles.column}>
            <CardMedia
              component="img"
              src={product.gallery.first.url}
              alt="Imagen 1"
              sx={styles.image}
            />
            <CardMedia
              component="img"
              src={product.gallery.second.url}
              alt="Imagen 2"
              sx={styles.image}
            />
          </div>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} >
        <Card sx={styles.root}>
          <CardMedia
            component="img"
            src={product.gallery.third.url}
            alt="Imagen 3"
            sx={styles.image}
          />
        </Card>
      </Grid>
      
    </Grid>
  );
};

export default GaleryOneProduct;
