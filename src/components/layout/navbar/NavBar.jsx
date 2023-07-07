import {
	AppBar,
	Box,
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
import "./NavBar.css";
import CustomModalContainer from "../../common/customModal/CustomModalContainer";
import Badge from "@mui/material/Badge";

const NavBar = ({
	open,
	handleOpen,
	handleClose,
	cart,
	isLogged,
	accessToken,
}) => {

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
              {
               ( isLogged && accessToken ) && (
                  
                  <Link to="/dashboard">dashboard</Link>
                )
              }
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
