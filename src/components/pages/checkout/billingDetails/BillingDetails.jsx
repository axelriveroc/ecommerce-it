import { Box, TextField, Typography } from "@mui/material";

const BillingDetails = ({
	errors,
	shouldShowError,
	handleBlur,
	handleChange,
	values,
}) => {
	return (
		<>
			<Typography>Billing Details</Typography>
			<Box
				sx={{
					border: "solid pink",
					display: "flex",
					flexDirection: {md:"row", sm:"column"},
					flexWrap: "wrap",
					gap: 2,
				}}
			>
				<TextField
					label="Name"
					variant="outlined"
					onChange={handleChange}
					onBlur={handleBlur}
					name="name"
					value={values.name}
					error={shouldShowError("name")}
					helperText={shouldShowError("name") ? errors.name : ""}
					sx={{ width: {md:"45%", sm:"80%", xs:"95%"} }}
				/>
				<TextField
					label="Email"
					variant="outlined"
					onChange={handleChange}
					onBlur={handleBlur}
					name="email"
					value={values.email}
					error={shouldShowError("email")}
					helperText={shouldShowError("email") ? errors.email : ""}
					sx={{ width: {md:"45%", sm:"80%", xs:"95%"} }}
				/>
				<TextField
					label="Phone Number"
					variant="outlined"
					onChange={handleChange}
					onBlur={handleBlur}
					name="phoneNumber"
					value={values.phoneNumber}
					error={shouldShowError("phoneNumber")}
					helperText={shouldShowError("phoneNumber") ? errors.phoneNumber : ""}
					sx={{ width: {md:"45%", sm:"80%", xs:"95%"} }}
				/>
			</Box>
		</>
	);
};

export default BillingDetails;
