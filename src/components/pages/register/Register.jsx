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
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  toastDispatch
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        /* height: {md:"70vh", xs:"60vh"}, */
        backgroundColor: "#f1f1f1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: { md: "80%", xs: "95%" },
          mt: 2,
          pl: {md:5, xs:0},
        }}
      >
        <Link to="/">
          <Button sx={{ opacity: 0.5 }}>Go Back</Button>
        </Link>
      </Box>
      <Box
        component="form"
        sx={{
          width: { md: "80%", xs: "95%" },
          m: "0 auto",
          mt: "20px",
          mb: "20px",
          p: { md: 5, xs: 1 },
          backgroundColor: "white",
          borderRadius: "8px",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h3" align="left" paragraph sx={{}}>
          Register
        </Typography>
        <Typography sx={{ mb: 3, color: "primary.main" }}>
          User Details
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <TextField
            label="Name"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            value={values.name}
            error={shouldShowError("name")}
            helperText={shouldShowError("name") ? errors.name : ""}
            sx={{ width: { md: "45%", xs: "99%" } }}
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
            sx={{ width: { md: "45%", xs: "99%" } }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            name="phoneNumber"
            value={values.phoneNumber}
            error={shouldShowError("phoneNumber")}
            helperText={
              shouldShowError("phoneNumber") ? errors.phoneNumber : ""
            }
            sx={{ width: { md: "45%", xs: "99%" }, alignSelf: "flex-start" }}
          />
        </Box>

        <Typography sx={{ mb: 3, mt: 3, color: "primary.main" }}>
          Login Details
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <TextField
            label="Email"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            value={values.email}
            error={shouldShowError("email")}
            helperText={shouldShowError("email") ? errors.email : ""}
            sx={{ width: { md: "45%", xs: "99%" } }}
          />

          <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <FormControl
              sx={{ width: { md: "45%", xs: "99%" } }}
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
              {/* <FormHelperText error={errors.password ? true : false}>
          {errors.password}
        </FormHelperText> */}
              {shouldShowError("password") && (
                <FormHelperText error={true}>{errors.password}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              sx={{ width: { md: "45%", xs: "99%" } }}
              variant="outlined"
            >
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
                <FormHelperText error={true}>
                  {errors.repeatPassword}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 5 }}>
          Registrarme
        </Button>
      </Box>
      <Button onClick={()=>toastDispatch("welcome", "error")}>toast</Button>
      <ToastContainer />
    </Box>
  );
};

export default Register;
