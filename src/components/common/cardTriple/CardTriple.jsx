import {  Card } from "@mui/material";
import CardUniqueContainer from "./cardUnique/CardUniqueContainer";

const CardTriple = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection:{md:"row", xs:"column"},
        width: "80%",
        m: "0 auto",
        justifyContent: "space-evenly",
        alignItems: "center",
        mt: 10,
        mb: 10,
        height: {md:"55vh", xs:"140vh"},
        gap: 3,
        border: "none",
        boxShadow: "none",
      }}
    >
      <CardUniqueContainer />
    </Card>
  );
};

export default CardTriple;
