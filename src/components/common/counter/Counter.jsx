import { Box, Button, Typography } from "@mui/material";

const Counter = ({ onAdd, counter, setCounter }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "90%",
        justifyContent: "flex-start",
        gap:2
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "35%",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:"#f1f1f1",
          p:1,
        }}
      >
        <Button
          sx={{
            color: "secondary.main",
            opacity: "0.25",
            minWidth: "20px",
            height: "20px",
          }}
          onClick={() => setCounter(counter - 1)}
        >
          -
        </Button>
        <Typography>{counter}</Typography>
        <Button
          sx={{
            color: "secondary.main",
            opacity: "0.25",
            minWidth: "20px",
            height: "20px",
          }}
          onClick={() => setCounter(counter + 1)}
        >
          +
        </Button>
      </Box>

      <Button
        sx={{
          width: "160px",
        }}
        variant="contained"
        onClick={() => onAdd(counter)}
      >
        Add To Cart
      </Button>
    </Box>
  );
};

export default Counter;
