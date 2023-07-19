import {
	AppBar,
	Avatar,
	Box,
	Button,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Tooltip,
	Menu,
	MenuItem,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import DrawerMUI from "./DrawerMUI";
import { menu } from "../../../routes/navigation";
import "./NavBar.css";
import CustomModalContainer from "../../common/customModal/CustomModalContainer";
import Badge from "@mui/material/Badge";
import { useState } from "react";

const NavBar = ({
	open,
	handleOpen,
	handleClose,
	cart,
	isLogged,
	accessToken,
	logOut,
	user,
}) => {
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

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
							m: "0 auto",
							borderBottom: "1px outset",
							borderColor: "secondary.second",
						}}
					>
						<div>
							<img
								src="https://res.cloudinary.com/dwqrlr45w/image/upload/v1682637939/audiophileEcommerce/shared/desktop/logo_qnvapf.svg"
								alt=""
							/>
						</div>

						<List sx={{ display: "flex", gap: 2, pl: 1 }}>
							{menu.map(({ id, path, title }) => {
								return (
									<ListItem component={Link} to={path} key={id} sx={{ p: 0 }}>
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
								);
							})}
						</List>

						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: { md: 1, sm: 0.5 },
							}}
						>
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
								<Badge badgeContent={cart.length} color="primary" showZero>
									<ShoppingCartOutlinedIcon />
								</Badge>
							</IconButton>
							<CustomModalContainer open={open} handleClose={handleClose} />{" "}
							{/* Modal */}
							{!isLogged && !accessToken && (
								<>
									<ListItem component={Link} to="/login" sx={{ p: 1 }}>
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
									</ListItem>
									<Divider
										orientation="vertical"
										flexItem
										sx={{ borderColor: "primary.main" }}
									/>
									<ListItem component={Link} to="/signup" sx={{ p: 1 }}>
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
									</ListItem>
								</>
							)}
							{isLogged && accessToken && (
								<Box sx={{ flexGrow: 1 }}>
									<Tooltip title="Open settings">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar alt="Remy Sharp" src={user?.photoUrl} />
										</IconButton>
									</Tooltip>
									<Menu
										sx={{ mt: "45px" }}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										<MenuItem onClick={handleCloseUserMenu}>
											<Link to="/dashboard">
												<Button>dashboard</Button>
											</Link>
										</MenuItem>
										<MenuItem onClick={handleCloseUserMenu}>
											<Button onClick={logOut}>Logout</Button>
										</MenuItem>
									</Menu>
								</Box>
							)}
						</Box>
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
						<DrawerMUI
							isLogged={isLogged}
							accessToken={accessToken}
							handleCloseUserMenu={handleCloseUserMenu}
							logOut={logOut}
							user={user}
						/>

						<div>
							<img
								style={{ width: "130px" }}
								src="https://res.cloudinary.com/dwqrlr45w/image/upload/v1682637939/audiophileEcommerce/shared/desktop/logo_qnvapf.svg"
								alt=""
							/>
						</div>

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
								<Badge badgeContent={cart.length} color="primary" showZero>
									<ShoppingCartOutlinedIcon />
								</Badge>
							</IconButton>
							<CustomModalContainer open={open} handleClose={handleClose} />
						</div>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavBar;
