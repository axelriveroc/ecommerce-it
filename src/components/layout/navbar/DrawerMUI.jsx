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
	Avatar,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function DrawerMUI({ isLogged, accessToken, logOut, user }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer = () => {
		setIsOpen(!isOpen);
	};

	const list = (
		<Box
			sx={{ width: 250, backgroundColor: "secondary.main", height: "100%" }}
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
									sx={{ color: "secondary.second" }}
									primaryTypographyProps={{ style: { fontWeight: "bold" } }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				))}
			</List>
			<Divider
				sx={{ backgroundColor: "secondary.second", margin: "1.5rem 1rem" }}
			/>

			{!isLogged && !accessToken && (
				<List>
					{["login", "signup"].map((text) => (
						<ListItem key={text} disablePadding>
							<Link to={`/${text}`} style={{ textDecoration: "none" }}>
								<ListItemButton>
									<ListItemText
										primary={text.toUpperCase()}
										sx={{ color: "primary.main" }}
										primaryTypographyProps={{ style: { fontWeight: "bold" } }}
									/>
								</ListItemButton>
							</Link>
						</ListItem>
					))}
				</List>
			)}

			{isLogged && accessToken && (
				<List>
					<ListItem disablePadding sx={{ pl: 1, display: "flex", gap: 1 }}>
						<Avatar src={user?.photoUrl} />
						<Typography sx={{ color: "white" }}>
							{" "}
							{user?.displayName}{" "}
						</Typography>
					</ListItem>

					{user.rol === "admin" && (
						<ListItem disablePadding>
							<Link to="/dashboard" style={{ textDecoration: "none" }}>
								<ListItemButton>
									<ListItemText
										primary="Dashboard"
										sx={{ color: "primary.main" }}
										primaryTypographyProps={{ style: { fontWeight: "bold" } }}
									/>
								</ListItemButton>
							</Link>
						</ListItem>
					)}

					<ListItem disablePadding>
						<ListItemButton onClick={logOut}>
							<ListItemText
								primary="Logout"
								sx={{ color: "primary.main" }}
								primaryTypographyProps={{ style: { fontWeight: "bold" } }}
							>
								Logout
							</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
			)}
		</Box>
	);

	return (
		<div>
			{/* <Button >Toggle Drawer</Button> */}
			<IconButton
				onClick={toggleDrawer}
				size="large"
				edge="start"
				color="inherit"
				aria-label="menu"
				sx={{
					mr: 0,
				}}
			>
				<MenuIcon />
			</IconButton>
			<Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
				{list}
			</Drawer>
		</div>
	);
}
