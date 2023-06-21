import { Button, Grid, Hidden, IconButton, Typography } from "@mui/material";
import { menu } from "../../../routes/navigation";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { customTheme } from "../../../ThemeConfig";

const Footer = () => {
  return (
     <Grid
      container
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        width: "85%",
        margin: "0 auto",
        padding: "10px",
      }} 
    >
      {/* Desktop version */}
       <Hidden mdDown>
        <Grid item xs={12} md={6} sx={{ backgroundColor: "secondary.main" }}> 
          {/* Column 1 */}
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            gap="5px"
            p="10px 50px"
            height="100%"
            justifyContent="space-between"
          >
            <Grid item>
              {/* Logo */}
              <img
                src="https://res.cloudinary.com/dwqrlr45w/image/upload/v1682637939/audiophileEcommerce/shared/desktop/logo_qnvapf.svg"
                alt="Logo"
              />
            </Grid>
            <Grid item>
             
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "12px", color: "#a19d9d" }}
              >
                Audiophile is an all in one stop to fulfill your audio needs. We
                are a small team of music lovers and sound specialists who are
                devoted to helping you get the most out of personal audio. Come
                and visit our demo facility - we’re open 7 days a week.
              </Typography>
            </Grid>
            <Grid item>
             
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "11px", color: "#a19d9d" }}
              >
                &copy; 2023 All Rights Reserved
              </Typography>
            </Grid>
          </Grid>
        </Grid>   
 
        <Grid item xs={12} md={6} sx={{ backgroundColor: "secondary.main" }}> 
          {/* Column 2 */}
          <Grid
            container
            direction="column"
            alignItems="center"
            height="80%"
            justifyContent="space-around"
            width="80%"
          >
            <Grid
              item
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                mb: "30px",
              }}
            >
              <ul
                style={{ listStyleType: "none", display: "flex", gap: "20px" }}
              >
                {menu.map((item) => (
                  <li key={item.id}>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: customTheme.palette.secondary.second,
                        fontFamily: "sans-serif",
                      }}
                      to={item.path}
                    >
                      <Button color="primary" sx={{ fontWeight: "bold" }}>
                        {item.title.toUpperCase()}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                gap: "15px",
              }}
            >
              
              <Link>
                <IconButton
                  sx={{ color: customTheme.palette.secondary.second }}
                >
                  <FacebookIcon />
                </IconButton>
              </Link>
              <Link>
                <IconButton
                  sx={{ color: customTheme.palette.secondary.second }}
                >
                  <TwitterIcon />
                </IconButton>
              </Link>
              <Link>
                <IconButton
                  sx={{ color: customTheme.palette.secondary.second }}
                >
                  <InstagramIcon />
                </IconButton>
              </Link>
            </Grid>

          </Grid>
        </Grid>
      </Hidden> 

      {/* Mobile version */}
      <Hidden mdUp> 
       <Grid item xs={12}> 

       
          {/* Mobile layout */}
          <Grid
            container
            direction="column"
            alignItems="center"
            height="100%"
            justifyContent="space-around"
          >
            <Grid item>
              
              <img
                src="https://res.cloudinary.com/dwqrlr45w/image/upload/v1682637939/audiophileEcommerce/shared/desktop/logo_qnvapf.svg"
                alt="Logo"
              />
            </Grid>

            <Grid item>
             
              <ul
                style={{
                  listStyleType: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {menu.map((item) => (
                  <li key={item.id}>
                    <Link
                      style={{ textDecoration: "none", color: "#f1f1f1", fontFamily:"sans-serif", letterSpacing:"1.5px" }}
                      to={item.path}
                    >
                      {item.title.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>

            <Grid item>
           
              <Typography
                variant="subtitle2"
                textAlign="center"
                color="#a19d9d"
              >
                Audiophile is an all in one stop to fulfill your audio needs. We
                are a small team of music lovers and sound specialists who are
                devoted to helping you get the most out of personal audio. Come
                and visit our demo facility - we’re open 7 days a week.
              </Typography>
            </Grid>

            <Grid item>
             
              <Typography variant="subtitle2" color="#a19d9d">
                &copy; 2023 All Rigths Reserved
              </Typography>
            </Grid>

            <Grid item >
              <Link  style={{color:"whitesmoke", margin:"0px 5px"}}>
                <FacebookIcon />
              </Link>
              <Link style={{color:"whitesmoke", margin:"0px 5px"}}>
                <TwitterIcon />
              </Link>
              <Link style={{color:"whitesmoke", margin:"0px 5px"}}>
                <InstagramIcon />
              </Link>
            </Grid>
          </Grid>
        </Grid> 
       </Hidden> 
   </Grid> 
   );
}; 

export default Footer;
