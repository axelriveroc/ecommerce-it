import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/appRouter"
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./ThemeConfig"
import { CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { initAuthStateListener } from "./firebaseConfig";
import { useEffect } from "react";

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
  )
}

export default App
