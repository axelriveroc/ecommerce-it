import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import DrawerMUI from "./DrawerMUI";
import { menu } from "../../../routes/navigation";
import "./NavBar.css"
import CustomModalContainer from "../../common/customModal/CustomModalContainer";

const NavBar = ({open, handleOpen, handleClose}) => {
  return (
    <Box
      sx={{ flexGrow: 1, backgroundColor: "secondary.main", height: "100%" }}
    >
      <AppBar
        position="static"
        sx={{ minHeight: 0, backgroundColor: "rgb(25,25,25)", height: "100%" }}
      >
        <Toolbar sx={{ height: "100%" }}>
          {/* Para Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "80%",
              margin: "0 auto",
              borderBottom: "1px outset",
              borderColor: "secondary.second",
            }}
          >
            <div style={{}}>
              <img
                src="https://res.cloudinary.com/dwqrlr45w/image/upload/v1682637939/audiophileEcommerce/shared/desktop/logo_qnvapf.svg"
                alt=""
              />
            </div>

            <List sx={{ display: "flex" }}>
              {menu.map(({ id, path, title }) => {
                return (
                  <Button key={id}>
                    <ListItem component={Link} to={path}>
                      <ListItemText
                        primary={title.toUpperCase()}
                        sx={{
                          textDecoration: "none",
                          color: "secondary.second",
                          "&:hover": {
                            backgroundColor: "",
                            color: "primary.main",
                          },
                        }}
                      />
                    </ListItem>
                  </Button>
                );
              })}
            </List>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{
                  color: "secondary.second",
                  "&:hover": {
                    backgroundColor: "secondary.second",
                    color: "primary.main",
                  },
                }}

                onClick={handleOpen}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
              <CustomModalContainer
                open={open}
                handleClose={handleClose}
              />{" "}
              {/* Modal */}

              <ListItem component={Link} to="/login">
                <Button>
                  <ListItemText
                    primary="Login"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      "&:hover": {
                        color: "secondary.second",
                      },
                    }}
                  />
                </Button>
              </ListItem>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "primary.main" }}
              />
              <ListItem component={Link} to="/signup">
                <Button>
                  <ListItemText
                    primary="Signup"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      "&:hover": {
                        color: "secondary.second",
                      },
                    }}
                  />
                </Button>
              </ListItem>
            </div>
          </Box>

          {/* Para MOBILE */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <DrawerMUI />

            <div>
              <img
                style={{ width: "130px" }}
                src="https://res.cloudinary.com/dwqrlr45w/image/upload/v1682637939/audiophileEcommerce/shared/desktop/logo_qnvapf.svg"
                alt=""
              />
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <ShoppingCartOutlinedIcon />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
