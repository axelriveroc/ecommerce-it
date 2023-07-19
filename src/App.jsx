import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {  customTheme } from "./ThemeConfig";
import { CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { initAuthStateListener } from "./firebase/firebaseConfig";
import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    initAuthStateListener(dispatch);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
