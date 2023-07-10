import { useState } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../../../store/authSlice";
import { logoutFirebase } from "../../../firebaseConfig";

const NavBarContainer = () => {
	const { cart } = useSelector((store) => store.cartSlice);
	const { isLogged, accessToken, user } = useSelector(
		(store) => store.authSlice
	);
	const dispatch = useDispatch();

	console.log(user);

	const logOut = async () => {
		dispatch(logoutRedux());
		await logoutFirebase();
	};

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<NavBar
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			cart={cart}
			isLogged={isLogged}
			accessToken={accessToken}
			logOut={logOut}
			user={user}
		/>
	);
};

export default NavBarContainer;
