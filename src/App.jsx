import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/appRouter"
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./ThemeConfig"
import { CssBaseline } from "@mui/material";


function App() {

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
