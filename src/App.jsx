import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/appRouter"
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./ThemeConfig"


function App() {

  return (
    <BrowserRouter>
    <ThemeProvider theme={customTheme}>
     <AppRouter />
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
