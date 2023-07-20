import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./ThemeConfig";
import { CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { initAuthStateListener } from "./firebase/firebaseConfig";
import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { CloudinaryContext } from "cloudinary-react";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		initAuthStateListener(dispatch);
	}, [dispatch]);

	return (
		<BrowserRouter>
			<ThemeProvider theme={customTheme}>
				<CssBaseline />
				<CloudinaryContext cloudName='dgur5apfu'>
					<AppRouter />
				</CloudinaryContext>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
