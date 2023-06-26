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

const Login = ({
  showPassword,
  handleClickShowPassword,
  handleSubmit,
  handleChange,
  handleBlur,
  errors,
  shouldShowError,
  values
}) => {
  return (
    <Box component="form" style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        name="email"
        value={values.email}
        error={shouldShowError("email")}
        helperText={shouldShowError("email") ? errors.email : ""}
        //error={errors.email ? true : false}
        //helperText={errors.email ? errors.email : ""}
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

      <Button type="submit" variant="contained">
        Enviar
      </Button>
    </Box>
  );
};

export default Login;
