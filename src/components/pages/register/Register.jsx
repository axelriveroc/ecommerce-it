import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

const Register = ({
  showPassword,
  showRepeatPassword,
  handleClickShowPassword,
  handleClickShowRepeatPassword,
  handleSubmit,
  handleChange,
  handleBlur,
  errors,
  shouldShowError,
  values,
}) => {
  return (
    <Box component="form" style={{ marginTop: "20px" }} onSubmit={handleSubmit}>

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
        label="Last name"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        name="lastName"
        value={values.lastName}
        error={shouldShowError("lastName")}
        helperText={shouldShowError("lastName") ? errors.lastName : ""}
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

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
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
        {/* <FormHelperText error={errors.password ? true : false}>
          {errors.password}
        </FormHelperText> */}
        {shouldShowError("password") && (
          <FormHelperText error={true}>{errors.password}</FormHelperText>
        )}
      </FormControl>

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-repeatPassword"
          className={shouldShowError("repeatPassword") ? "Mui-error" : ""}
        >
          Password Confirm
        </InputLabel>
        <OutlinedInput
          name="repeatPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.repeatPassword}
          id="outlined-adornment-repeatPassword"
          type={showRepeatPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle repeatPassword visibility"
                onClick={handleClickShowRepeatPassword}
                edge="end"
              >
                {showRepeatPassword ? (
                  <VisibilityOff color="primary" />
                ) : (
                  <Visibility color="primary" />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Password confirm"
          error={shouldShowError("repeatPassword")}
        />
       
        {shouldShowError("repeatPassword") && (
          <FormHelperText error={true}>{errors.repeatPassword}</FormHelperText>
        )}
      </FormControl>

      <Button type="submit" variant="contained">
        Registrarme
      </Button>
    </Box>
  );
};

export default Register;
