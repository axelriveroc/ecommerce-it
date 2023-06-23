import { useState } from "react";
import NavBar from "./NavBar"

const NavBarContainer = () => {

      const [open, setOpen] = useState(false);

      const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
  return (
    <NavBar open={open} handleOpen={handleOpen} handleClose={handleClose} />
  )
}

export default NavBarContainer