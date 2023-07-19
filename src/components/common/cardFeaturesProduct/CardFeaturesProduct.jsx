import { Box, List, ListItem, Typography } from "@mui/material";

const CardFeaturesProduct = ({ product }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: {xs:"90%", md:"80%", sm:"80%"},
        m: "0 auto",
        flexDirection:{md:"row", sm:"column", xs:"column"},
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          p: {md:5, sm:5, xs:2},
          width: {md:"60%", sm:"100%"},
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "36px",
            letterSpacing: "1.143px",
          }}
        >
          FEATURES
        </Typography>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: "25px",
            opacity: 0.5,
            mt: 2,
            whiteSpace: "pre-line",
          }}
        >
          {product.features}
        </Typography>
      </Box>
      <Box
        sx={{
          p: {md:5, sm:5, xs:2},
          mr: 4,
          display:"flex",
          flexDirection:{md:"column", sm:"row", xs:"column"},
          justifyContent:{md:"flex-start", sm:"space-around"},
          alignItems:"flex-start",
          width:{sm:"100%", md:"40%", sx:"100%"}
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "36px",
            letterSpacing: "1.143px",
          }}
        >
          IN THE BOX
        </Typography>
        <List>
          {product.includes &&
            product.includes.map((item) => (
              <ListItem key={item.item} sx={{pl:1, pb:0}}>
                <span
                  style={{
                    color: "#D87D4A",
                    fontWeight: 700,
                    lineHeight: "25px",
                  }}
                >
                  x{item.quantity}
                </span>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    lineHeight: "25px",
                    opacity: 0.5,
                    ml:2,
                  }}
                >
                  {item.item}
                </Typography>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default CardFeaturesProduct;
