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

        
        <Box component="form" sx={{ border:"solid green" , display:"flex", width:"90%", m:"0 auto" ,flexDirection:"row", justifyContent:"space-evenly"}} onSubmit={handleSubmit}>

          <Box>

              <Typography>Billing Details</Typography>
              <Box sx={{border:"solid pink", display:"flex", flexWrap:"wrap", gap:2,}}>
                
                <TextField
                  label="Name"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  value={values.name}
                  error={shouldShowError("name")}
                  helperText={shouldShowError("name") ? errors.name : ""}
                  sx={{width:"45%"}}
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
                  sx={{width:"45%"}}

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
                  sx={{width:"45%"}}

                  />

              </Box>

              <Typography>Shipping Info</Typography>
              <Box sx={{border:"solid yellow", display:"flex", flexWrap:"wrap", gap:2,}}>
                <TextField
                  label="Adress"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="adress"
                  value={values.adress}
                  error={shouldShowError("adress")}
                  helperText={shouldShowError("adress") ? errors.adress : ""}
                  sx={{width:"92%"}}
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
                  sx={{width:"45%"}}
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
                  sx={{width:"45%"}}
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
                  sx={{width:"45%"}}
                />
              </Box>

              <Typography>Payments Details</Typography>

                <Box sx={{border:"solid black", display:"flex", flexDirection:"column"}}>

                  <Box sx={{border:"solid red", display:"flex",}}>
                    <Typography sx={{border:"solid green", width:"45%"}}>Payment Method</Typography>
                    <FormControl
                      component="fieldset"
                      error={errors.paymentMethod ? true : false}
                      sx={{width:"50%"}}
                    >

                      <RadioGroup
                        row
                        aria-label="paymentMethod"
                        name="paymentMethod"
                        value={values.paymentMethod}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{border:"solid orange", width:"100%", display:"flex", flexDirection:"column", gap:1}}
              /*           color={errors.paymentMethod ? true : false}
              */        >
                        <FormControlLabel
                          value="e-Money"
                          control={<Radio />}
                          label="e-Money"
                          sx={{border:"solid orange 1px", m:0, borderRadius:2, p:1}}
              /*             color={errors.paymentMethod ? true : false}
              */          />
                        <FormControlLabel
                          value="Cash on Delivery"
                          control={<Radio />}
                          label="Cash on Delivery"
                          sx={{border:"solid orange 1px", m:0, borderRadius:2, p:1}}
                          error={errors.paymentMethod ? true : false}
                        />
                      </RadioGroup>
                      {errors.paymentMethod && (
                        <FormHelperText>{errors.paymentMethod}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  <Box sx={{border:"solid violet", display:"flex", width:"100%", flexWrap:"wrap", gap:1}}>
                    <TextField
                      label="e-Money Number"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="eMoneyNumber"
                      value={values.eMoneyNumber}
                      error={shouldShowError("eMoneyNumber")}
                      helperText={shouldShowError("eMoneyNumber") ? errors.eMoneyNumber : ""}
                      sx={{width:"45%"}}
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
                      sx={{width:"45%"}}
                    />
                  </Box>

                  <ModalPayContainer open={open} handleClose={handleClose} />
                </Box>
              
          </Box>

          <Box sx={{border:"solid red", width:"40%"}}>
            <SummaryPayContainer />
            <Button variant="contained" type="submit">
              Continuea & pay
            </Button>
          </Box>

        </Box> 
    </Box>
  );
};
export default Checkout;
