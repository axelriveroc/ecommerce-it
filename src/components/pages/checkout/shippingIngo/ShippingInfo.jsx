import { Box, TextField, Typography } from "@mui/material";

const ShippingInfo = ({
	errors,
	shouldShowError,
	handleBlur,
	handleChange,
	values,
}) => {

	return (
		<>
			<Typography>Shipping Info</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: {md:"row", sm:"column"},
					flexWrap: "wrap",
					gap: 2,
				}}
			>
				<TextField
					label="Adress"
					variant="outlined"
					onChange={handleChange}
					onBlur={handleBlur}
					name="adress"
					value={values.adress}
					error={shouldShowError("adress")}
					helperText={shouldShowError("adress") ? errors.adress : ""}
					sx={{ width: {md:"92%", sm:"80%", xs:"95%"} }}
				/>
				<TextField
					label="Zip Code"
					variant="outlined"
					onChange={handleChange}
					onBlur={handleBlur}
					name="zipCode"
					value={values.zipCode}
					error={shouldShowError("zipCode")}
					helperText={shouldShowError("zipCode") ? errors.zipCode : ""}
					sx={{ width: {md:"45%", sm:"80%", xs:"95%"} }}
				/>
				<TextField
					label="City"
					variant="outlined"
					onChange={handleChange}
					onBlur={handleBlur}
					name="city"
					value={values.city}
					error={shouldShowError("city")}
					helperText={shouldShowError("city") ? errors.city : ""}
					sx={{ width: {md:"45%", sm:"80%", xs:"95%"} }}
				/>
				<TextField
					label="Country"
					variant="outlined"
					onChange={handleChange}
					onBlur={handleBlur}
					name="country"
					value={values.country}
					error={shouldShowError("country")}
					helperText={shouldShowError("country") ? errors.country : ""}
					sx={{ width: {md:"45%", sm:"80%", xs:"95%"} }}
				/>
			</Box>
		</>
	);
};

export default ShippingInfo;
