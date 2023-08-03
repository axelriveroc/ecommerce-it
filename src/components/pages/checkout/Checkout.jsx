import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SummaryPayContainer from "./summaryPay/SummaryPayContainer";
/* import BillingDetails from "./billingDetails/BillingDetails";
import ShippingInfo from "./shippingIngo/ShippingInfo";
import PaymentsDetails from "./paymentsDetails/PaymentsDetails"; */
import { Link } from "react-router-dom";
import SuccessMP from "../mercadoPago/SuccessMP";
import SpinnerCustom from "../../common/spinner/SpinnerCustom";

/* const styles = {
  box: {
    display: "flex",
    width: "90%",
    m: "0 auto",
    flexDirection: { md: "row", sm: "column", xs: "column" },
    justifyContent: "space-evenly",
    gap: 1,
  },
}; */

const Checkout = ({
/*  handleSubmit,
  handleChange,
	 handleBlur,
	errors,
	shouldShowError,
	values,
	handleClose,
	open, */
  preferenceId,
  cart,
  setPagando,
  pagando,
  orderId,
  handleChangeLocal,
  handleBuy,
  paramValue,
  errorsForm,
  esperaBotonMP,
}) => {
  return (
    <Box sx={{ backgroundColor: "#F1F1F1" }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            width: "80%",
            margin: "0 auto",
            pt: 1,
            color: "primary.main",
            opacity: 0.5,
          }}
        >
          {" "}
          Go Back
        </Typography>
        {orderId && <SuccessMP orderId={orderId} paramValue={paramValue} />}
      </Link>
      {/*<Box component="form" sx={styles.box} onSubmit={handleSubmit}>
        <Box
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
						gap: 1,
						backgroundColor: "#ffffff",
						mb: 2,
						mt: 2,
						borderRadius: "8px",
						boxShadow: "none",
						borde: "none",
					}}
				>
					<h1>CHECKOUT</h1>
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
      </Box>*/}

      <Box
        sx={{
          display: "flex",
          width: { md: "80%" },
          m: "0 auto",
          flexDirection: { md: "row", sm: "column" },
        }}
      >
        {!pagando && !orderId && (
          <Box sx={{ width: { md: "70%" } }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              alignItems="center"
              justifyContent={"center"}
            >
              <Grid item xs={10} md={5}>
                <TextField
                  name="name"
                  label="Nombre completo"
                  fullWidth
                  onChange={handleChangeLocal}
                />
              </Grid>

              <Grid item xs={10} md={5}>
                <TextField
                  name="adress"
                  label="Direccion"
                  fullWidth
                  onChange={handleChangeLocal}
                />
              </Grid>
              <Grid item xs={10} md={5}>
                <TextField
                  name="cp"
                  label="Codigo postal"
                  fullWidth
                  onChange={handleChangeLocal}
                />
              </Grid>
              <Grid item xs={10} md={5}>
                <TextField
                  name="phone"
                  label="Telefono"
                  fullWidth
                  onChange={handleChangeLocal}
                />
              </Grid>
              <Grid item xs={10} md={5}></Grid>

              {errorsForm && (
                <Grid item xs={10} md={5}>
                  <Typography variant="error" color="error">
                    Hay campos incompletos en el formulario
                  </Typography>
                </Grid>
              )}
              <Grid item xs={10}>
                <Button
                  variant="contained"
                  onClick={handleBuy}
                  sx={{ marginTop: "20xp" }}
                >
                  Seleccione metodo de pago
                </Button>
              </Grid>
            </Grid>
			<br />
            {esperaBotonMP && !pagando && <SpinnerCustom />}
          </Box>
        )}

        <SummaryPayContainer
          orderId={orderId}
          pagando={pagando}
          setPagando={setPagando}
          preferenceId={preferenceId}
          cart={cart}
          esperaBotonMP={esperaBotonMP}
        />
      </Box>

    </Box>
  );
};
export default Checkout;
