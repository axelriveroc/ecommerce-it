import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	Divider,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../../common/loadingButton/LoadingButton";

const Login = ({
	showPassword,
	handleClickShowPassword,
	handleSubmit,
	handleChange,
	handleBlur,
	errors,
	shouldShowError,
	values,
	ingresarConGoogle,
	ingresarConFacebook,
	handleResetPassword,
	mailChangePassword,
	dispatch,
	isLoading,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#f1f1f1",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					width: "50%",
					pl: 5,
				}}
			>
				<Link to="/">
					<Button sx={{ opacity: 0.5, maxWidth: "400px" }}>Go Back</Button>
				</Link>
			</Box>

			<Box
				component="form"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: { md: "50%", xs: "95%" },
					maxWidth: "80%",
					margin: "0 auto",
					mt: { md: "20px", xs: "5px" },
					p: { md: 5, xs: 4 },
					backgroundColor: "white",
					borderRadius: "8px",
					border: "none",
				}}
				onSubmit={handleSubmit}
			>
				<Typography variant="h3" align="left" paragraph sx={{}}>
					Login
				</Typography>
				<TextField
					label="Email"
					variant="outlined"
					onChange={handleChange}
					onBlur={handleBlur}
					name="email"
					value={values.email}
					error={shouldShowError("email")}
					helperText={shouldShowError("email") ? errors.email : ""}
					sx={{ width: "90%" }}
				/>
				<FormControl sx={{ m: 1, width: "90%" }} variant="outlined">
					<InputLabel
						htmlFor="outlined-adornment-password"
						className={shouldShowError("password") ? "Mui-error" : ""}
					>
						Password
					</InputLabel>
					<OutlinedInput
						name="password"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						id="outlined-adornment-password"
						type={showPassword ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end"
								>
									{showPassword ? (
										<VisibilityOff color="primary" />
									) : (
										<Visibility color="primary" />
									)}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
						error={shouldShowError("password")}
					/>
					{shouldShowError("password") && (
						<FormHelperText error={true}>{errors.password}</FormHelperText>
					)}
				</FormControl>

				{isLoading ? (
					<LoadingButton />
				) : (
					<Button type="submit" variant="contained" sx={{ width: "90%" }}>
						Continue
					</Button>
				)}

				<div>
					<Button
						onClick={handleResetPassword}
						sx={{ fontSize: { md: 10.2, xs: 10 } }}
					>
						Olvidaste tu contraseña?
					</Button>
				</div>
				{mailChangePassword && (
					<small>
						Se ha enviado un link a tu mail para cambiar de contraseña
					</small>
				)}
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						alignItems: "flex-start",
					}}
				>
					<h6 style={{ alignSelf: "center" }}>Ingresar con: </h6>
					<Divider />
					<IconButton
						onClick={() => dispatch(ingresarConGoogle())}
						sx={{ color: "primary.main" }}
					>
						<GoogleIcon />
						<Typography sx={{ fontSize: { md: "18px", xs: "15px" } }}>
							{" "}
							- Google
						</Typography>
					</IconButton>
					<IconButton
						onClick={() => dispatch(ingresarConFacebook())}
						sx={{ color: "primary.main" }}
					>
						<FacebookOutlinedIcon />
						<Typography sx={{ fontSize: { md: "18px", xs: "15px" } }}>
							{" "}
							- Facebook
						</Typography>
					</IconButton>
				</Box>
			</Box>
			<ToastContainer />
		</Box>
	);
};

export default Login;
