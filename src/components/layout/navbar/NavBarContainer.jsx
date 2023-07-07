import { useState } from "react";
import NavBar from "./NavBar"
import { useSelector } from "react-redux";


const NavBarContainer = () => {
  const { cart } = useSelector((store) => store.cartSlice);
  const { isLogged, accessToken, user } = useSelector(store => store.authSlice)

      console.log(user)
      const [open, setOpen] = useState(false);

      const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
  return (
    <NavBar open={open} handleOpen={handleOpen} handleClose={handleClose} cart={cart} isLogged={isLogged} accessToken={accessToken}/>
  )
}

export default NavBarContainer