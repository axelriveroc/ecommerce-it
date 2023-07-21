import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(25,25,25)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 2,
        gap: 5,
      }}
    >
      <Typography color="white">Cargando ...</Typography>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
