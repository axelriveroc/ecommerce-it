import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ModalPayContainer from "../../../common/customModalPay/ModalPayContainer";

const PaymentsDetails = ({
  errors,
  shouldShowError,
  handleBlur,
  handleChange,
  values,
  handleClose,
  open,
}) => {
  return (
    <>
      <Typography>Payments Details</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", sm: "column", xs: "column" },
          }}
        >
          <Typography sx={{ width: { md: "45%", sm: "80%", xs: "95%" } }}>
            Payment Method
          </Typography>
          <FormControl
            component="fieldset"
            error={errors.paymentMethod ? true : false}
            sx={{ width: { md: "50%", sm: "80%", xs: "95%" } }}
          >
            <RadioGroup
              row
              aria-label="paymentMethod"
              name="paymentMethod"
              value={values.paymentMethod}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <FormControlLabel
                value="e-Money"
                control={<Radio />}
                label="e-Money"
                sx={{
                  border: "solid orange 1px",
                  m: 0,
                  borderRadius: 2,
                  p: 1,
                }}
              />
              <FormControlLabel
                value="Cash on Delivery"
                control={<Radio />}
                label="Cash on Delivery"
                sx={{
                  border: "solid orange 1px",
                  m: 0,
                  borderRadius: 2,
                  p: 1,
                }}
              />
            </RadioGroup>
            {errors.paymentMethod && (
              <FormHelperText>{errors.paymentMethod}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", sm: "column", xs: "column" },
            width: "100%",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <TextField
            label="e-Money Number"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            name="eMoneyNumber"
            value={values.eMoneyNumber}
            error={shouldShowError("eMoneyNumber")}
            helperText={
              shouldShowError("eMoneyNumber") ? errors.eMoneyNumber : ""
            }
            sx={{ width: { md: "45%", sm: "80%", xs: "95%" } }}
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
            sx={{ width: { md: "45%", sm: "80%", xs: "95%" } }}
          />
        </Box>

        <ModalPayContainer open={open} handleClose={handleClose} />
      </Box>
    </>
  );
};

export default PaymentsDetails;
