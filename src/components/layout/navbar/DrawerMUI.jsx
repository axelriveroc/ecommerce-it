import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function DrawerMUI() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const list = (
    <Box
      sx={{ width: 250, backgroundColor: "secondary.main", height:"100%" }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {["home", "headphones", "speakers", "earphones"].map((text) => (
          <ListItem key={text} disablePadding>
            <Link
              to={text === "home" ? "/" : `/category/${text}`}
              style={{ textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemText
                  primary={text.toUpperCase()}
                  sx={{color: "secondary.second"}}
                  primaryTypographyProps={{ style: { fontWeight: "bold" } }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "secondary.second", margin: "1.5rem 1rem" }} />
      <List>
        {["login", "signup"].map((text) => (
          <ListItem key={text} disablePadding>
            <Link to={`/${text}`} style={{ textDecoration: "none" }}>
              <ListItemButton>
                <ListItemText
                  primary={text.toUpperCase()}
                  sx={{color:"primary.main"}}
                  primaryTypographyProps={{ style: { fontWeight: "bold" } }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div >
      {/* <Button >Toggle Drawer</Button> */}
      <IconButton
        onClick={toggleDrawer}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{
          mr: 0
         
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer} >
        {list}
      </Drawer>
    </div>
  );
}
