import { useState } from "react";
import NavBar from "./NavBar"
import { useSelector } from "react-redux";


const NavBarContainer = () => {
  const { cart } = useSelector((store) => store.cartSlice);


      const [open, setOpen] = useState(false);

      const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
  return (
    <NavBar open={open} handleOpen={handleOpen} handleClose={handleClose} cart={cart}/>
  )
}

export default NavBarContainer