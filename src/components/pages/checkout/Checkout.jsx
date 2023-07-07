import {
	Box,
	Typography,
} from "@mui/material";
import SummaryPayContainer from "./summaryPay/SummaryPayContainer";
import BillingDetails from "./billingDetails/BillingDetails";
import ShippingInfo from "./shippingIngo/ShippingInfo";
import PaymentsDetails from "./paymentsDetails/PaymentsDetails";

const styles={
  box:{
    display: "flex",
    width: "90%",
    m: "0 auto",
    flexDirection: {md:"row", sm:"column", xs:"column"},
    justifyContent: "space-evenly",
  }
}

const Checkout = ({
	handleSubmit,
	handleChange,
	handleBlur,
	errors,
	shouldShowError,
	values,
	handleClose,
	open,
}) => {
	return (
		<Box>
			<Typography>Go Back</Typography>

			<Box
				component="form"
				sx={styles.box}
				onSubmit={handleSubmit}
			>
				<Box sx={{p:2, display:"flex", flexDirection:"column", justifyContent:"space-evenly", gap:1}}>
					<BillingDetails
						shouldShowError={shouldShowError}
						errors={errors}
						handleBlur={handleBlur}
						handleChange={handleChange}
						values={values}
					/>

					<ShippingInfo
						shouldShowError={shouldShowError}
						errors={errors}
						handleBlur={handleBlur}
						handleChange={handleChange}
						values={values}
					/>

					<PaymentsDetails
						shouldShowError={shouldShowError}
						errors={errors}
						handleBlur={handleBlur}
						handleChange={handleChange}
						values={values}
						handleClose={handleClose}
            open={open}
					/>
				</Box>

				<SummaryPayContainer />
			</Box>
		</Box>
	);
};
export default Checkout;
