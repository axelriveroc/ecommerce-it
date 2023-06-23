import { Box, Typography } from "@mui/material";
import CardProductsByCategory from "../../common/CardProductsByCategory";
import CardBringingContainer from "../../common/cardBringing/CardBringingContainer";

const Category = ({ productsList, categoryName }) => {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "120px",
          backgroundColor: "secondary.main",
          display: "flex",
          justifyContent:"center", 
          alignItems:"center",
          textTransform: "uppercase"
        }}
      >
        <Typography color="secondary.second" variant="h3">{categoryName}</Typography>
      </Box>
      {productsList.map((p, i) => {
        return <CardProductsByCategory key={p.id} product={p} index={i} />;
      })}

      <CardBringingContainer />
    </div>
  );
};

export default Category;
