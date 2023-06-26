import {  Card } from "@mui/material";
import CardUniqueContainer from "./cardUnique/CardUniqueContainer";

const CardTriple = () => {
  return (
    <Card
      sx={{
        display: "flex",
        width: "80%",
        m: "0 auto",
        justifyContent: "space-evenly",
        alignItems: "center",
        mt: 10,
        mb: 10,
        height: "55vh",
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
