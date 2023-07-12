import { Button, CircularProgress } from "@mui/material";

const LoadingButton = () => {
  return (
    <Button variant="contained" sx={{width:"90%"}}>
      <CircularProgress size={16} color="inherit"  />
    </Button>
  );
}

export default LoadingButton