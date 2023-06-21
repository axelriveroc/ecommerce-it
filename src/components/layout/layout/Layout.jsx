import { Outlet } from "react-router-dom"
import FooterContainer from "../footer/FooterContainer"
import NavBarContainer from "../navbar/NavBarContainer"
import { customTheme } from "../../../ThemeConfig"
import { Box } from "@mui/material"

const Layout = () => {
  return (
    <>
      <div
        style={{
          height: "12vh",
          backgroundColor: customTheme.palette.secondary.main,
        }}
      >
        <NavBarContainer />
      </div>
      <div
        style={{
          minHeight: "calc( 100vh - 42vh )"
         
        }}
      >
        {" "}
        <Outlet />{" "}
      </div>
      <Box
        sx={{
          height: {xs: "80vh", md: "30vh"} ,
          backgroundColor: customTheme.palette.secondary.main,
        }}
      >
        <FooterContainer /> 
      </Box>
    </>
  );
}

export default Layout