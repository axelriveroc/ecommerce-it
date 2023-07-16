import { createTheme } from "@mui/material";

// #101010 negro
// #D87D4A naranja
// #f1f1f1 blanco

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#D87D4A", //naranja
      second: "#FBAF85",
    },
    secondary: {
      main: "#101010", //negro
      second: "#f1f1f1" // blanco
    },
  },
});

export const customDark = createTheme({
  palette: {
    primary: {
      main: "#D87D4A",
      second: "#FBAF85",
    },
    secondary: {
      main: "#f1f1f1",
      second: "white",
    },
  },
});