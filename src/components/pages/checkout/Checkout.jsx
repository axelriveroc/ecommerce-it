import { Box, Button, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import ModalPayContainer from "../../common/customModalPay/ModalPayContainer";
import SummaryPayContainer from "./summaryPay/SummaryPayContainer";
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
    <Box>
      <Box component="form" style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
        <Typography>Billing Details</Typography>
        <Box>
          
          <TextField
            label="Name"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            value={values.name}
            error={shouldShowError("name")}
            helperText={shouldShowError("name") ? errors.name : ""}
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
            />

        </Box>

        <Typography>Shipping Info</Typography>
        <Box>
          <TextField
            label="Adress"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            name="adress"
            value={values.adress}
            error={shouldShowError("adress")}
            helperText={shouldShowError("adress") ? errors.adress : ""}
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
          />
      </Box>

      <Typography>Payments Details</Typography>

      <FormControl
        component="fieldset"
        error={errors.paymentMethod ? true : false}
      >
        <Typography>Payment Method</Typography>
        <RadioGroup
          row
          aria-label="paymentMethod"
          name="paymentMethod"
          value={values.paymentMethod}
          onChange={handleChange}
          onBlur={handleBlur}
/*           color={errors.paymentMethod ? true : false}
 */        >
          <FormControlLabel
            value="e-Money"
            control={<Radio />}
            label="e-Money"
/*             color={errors.paymentMethod ? true : false}
 */          />
          <FormControlLabel
            value="Cash on Delivery"
            control={<Radio />}
            label="Cash on Delivery"
            error={errors.paymentMethod ? true : false}
          />
        </RadioGroup>
        {errors.paymentMethod && (
          <FormHelperText>{errors.paymentMethod}</FormHelperText>
        )}
      </FormControl>
      <TextField
        label="e-Money Number"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        name="eMoneyNumber"
        value={values.eMoneyNumber}
        error={shouldShowError("eMoneyNumber")}
        helperText={shouldShowError("eMoneyNumber") ? errors.eMoneyNumber : ""}
      />
      <TextField
        label="e-Money Pin"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        name="eMoneyPin"
        value={values.eMoneyPin}
        error={shouldShowError("eMoneyPin")}
        helperText={shouldShowError("eMoneyPin") ? errors.eMoneyPin : ""}
      />

      <ModalPayContainer open={open} handleClose={handleClose} />

      <Button variant="contained" type="submit">
        pagar
      </Button>
      </Box>
      <Box>
        <SummaryPayContainer />
      </Box>
    </Box>
     </Box>
  );
};
export default Checkout;
