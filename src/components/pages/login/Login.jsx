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
  Typography,
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
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "400px",
        margin: "0 auto",
        mt: "20px",
        p: 5,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h3" align="left" paragraph sx={{

      }} >
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

      <FormControl
        sx={{ m: 1, maxWidth: "400px", width: "90%" }}
        variant="outlined"
      >
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

      <Button type="submit" variant="contained" sx={{ width: "90%" }}>
        Enviar
      </Button>
    </Box>
  );
};

export default Login;
