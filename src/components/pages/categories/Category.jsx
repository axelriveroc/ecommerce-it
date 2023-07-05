import { Box, Typography } from "@mui/material";
import CardProductsByCategory from "../../common/cardProductsByCategory/CardProductsByCategory";
import CardBringingContainer from "../../common/cardBringing/CardBringingContainer";
import CardTripleContainer from "../../common/cardTriple/CardTripleContainer";

const Category = ({ productsList, categoryName }) => {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "100px",
          backgroundColor: "rgb(25,25,25)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "uppercase",
        }}
      >
        <Typography color="secondary.second" variant="h3" sx={{fontSize:{xs:30}}}>
          {categoryName}
        </Typography>
      </Box>

      {productsList.map((p, i) => {
        return <CardProductsByCategory key={p.id} product={p} index={i} />;
      })}
      <CardTripleContainer />
      <CardBringingContainer />
    </div>
  );
};

export default Category;
