import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";
import SpeakerIcon from "@mui/icons-material/Speaker";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from '@mui/icons-material/Dashboard';
const drawerWidth = 240;

const DrawerDashboard = (props) => {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div style={{backgroundColor:"#5e5e5e", minHeight:"100%"}}>
			<Toolbar />
			<Divider />
			<List>
				<ListItem disablePadding>
					<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
						<ListItemButton>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary={"Home"} />
						</ListItemButton>
					</Link>
				</ListItem>
				<ListItem disablePadding>
					<Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
						<ListItemButton>
							<ListItemIcon>
							<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary={"Dashboard"} />
						</ListItemButton>
					</Link>
				</ListItem>
				<ListItem disablePadding>
					<Link to="/dashboard-products" style={{ textDecoration: "none", color: "inherit" }}>
						<ListItemButton>
							<ListItemIcon>
								<SpeakerIcon />
							</ListItemIcon>
							<ListItemText primary={"Products"} />
						</ListItemButton>
					</Link>
				</ListItem>
				<ListItem disablePadding>
					<Link to="/dashboard-users" style={{ textDecoration: "none", color: "inherit" }}>
						<ListItemButton>
							<ListItemIcon>
								<PeopleAltIcon />
							</ListItemIcon>
							<ListItemText primary={"Users"} />
						</ListItemButton>
					</Link>
				</ListItem>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<Box sx={{ display: "flex", backgroundColor:"rgb(25,25,25)" }}>
			<CssBaseline />

			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor:"rgb(25,25,25)"
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div"color="primary">
						DASHBOARD 
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } , background:"#5e5e5e"}}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
						background:"#5e5e5e",
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					minHeight:"100vh",
					mt: 9,
					backgroundColor:"rgb(25,25,25)"
				}}
			>
				<Outlet />
				{/* <Toolbar />
				<Typography paragraph>
					SOY EL DRAWER DEL DASHBOARD
				</Typography> */}
			</Box>
		</Box>
	);
};

export default DrawerDashboard;
