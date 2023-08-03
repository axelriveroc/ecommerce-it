import { Button, Card, CardContent, Typography } from "@mui/material";
import imageBgMobile from "../../../assets/home/mobile/image-header.jpg";
import imageBg from "../../../assets/home/desktop/image-hero.jpg";
import imageBg_tablet from "../../../assets/home/tablet/image-header.jpg";
import imgSpeaker1_desktop from "../../../assets/home/desktop/image-speaker-zx9.png";
import imgSpeaker2_desktop from "../../../assets/home/desktop/image-speaker-zx7.jpg";
import imgSpeaker2_mobile from "../../../assets/home/mobile/image-speaker-zx7.jpg";
import imgSpeaker2_tablet from "../../../assets/home/tablet/image-speaker-zx7.jpg";
import img3_desktop from "../../../assets/home/desktop/image-earphones-yx1.jpg";
import CardBringingContainer from "../../common/cardBringing/CardBringingContainer";
import CardTriple from "../../common/cardTriple/CardTriple";
import "./HomeStyle.css";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../../common/scrollToTop/ScrollToTop";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../store/cartSlice";

const Home = () => {
	//const {clearCart} = useSelector((store)=> store.cart)
	const dispatch = useDispatch()
	return (
		<div>
			<ScrollToTopButton />

			<Card
				sx={{
					backgroundImage: {
						md: `url(${imageBg})`,
						xs: `url(${imageBgMobile})`,
						sm: `url(${imageBg_tablet})`,
					},
					backgroundColor: "rgb(25,25,25)",
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
					backgroundPosition: { md: "center right", xs: "center" },
					width: "100%",
					height: "70vh",
					overflow: "hidden",
					display: "flex",
					justifyContent: { md: "flex-start", xs: "center", sm: "center" },
					alignItems: "center",
					borderRadius: "0px",
				}}
			>
				<Button onClick={()=> dispatch(clearCart())} >Limpiar localstorage</Button>
				<CardContent
					sx={{
						width: { md: "50%", xs: "90%", sm: "50%" },
						height: "80%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						ml: { md: 20, xs: 0 },
						gap: { md: 3, xs: 0 },
						alignItems: { xs: "center", md: "flex-start" },
					}}
				>
					
					<Typography
						sx={{
							color: "#FFF",
							fontSize: "14px",
							letterSpacing: "10px",
							opacity: "0.4963814914226532",
						}}
					>
						NEW PRODUCT
					</Typography>
					<Typography
						variant="h3"
						sx={{
							color: "#FFF",
							fontSize: { md: "56px", xs: "40px", sm: "45px" },
							fontWeight: 700,
							lineHeight: "58px",
							letterSpacing: "2px",
							textTransform: "uppercase",
							textAlign: { xs: "center", sm: "center", md: "start" },
						}}
					>
						XX99 Mark II Headphones
					</Typography>
					<Typography
						sx={{
							color: "#FFF",
							fontSize: "15px",
							fontWeight: 500,
							lineHeight: "25px",
							letterSpacing: "1px",
							opacity: 0.75,
							width: { md: "60%", xs: "95%" },
							textAlign: { xs: "center", md: "start" },
						}}
					>
						Experience natural, lifelike audio and exceptional build quality
						made for the passionate music enthusiast.
					</Typography>
					<Button variant="contained" sx={{ width: "50%" }}>
						<Link
							to="/"
							style={{ textDecoration: "none", color: "white" }}
						>
							SEE PRODUCT
						</Link>
					</Button>
				</CardContent>
			</Card>

			<CardTriple />

			<Card
				sx={{
					height: { md: "560px", xs: "75vh" },
					margin: "0 auto",
					borderRadius: "8px",
					backgroundColor: "#D87D4A",
					mt: 10,
					mb: 5,
					display: "flex",
					flexDirection: { md: "row", xs: "column" },
					justifyContent: "space-evenly",
					alignItems: "center",
					width: { md: "80%", xs: "95%" },
				}}
			>
				<img src={imgSpeaker1_desktop} alt="" className="img_mobile" />
				<CardContent
					sx={{
						width: { md: "40%", xs: "99%" },
						height: { md: "70%", xs: "55%" },
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						pt: { md: 4, xs: 1 },
						textAlign: { md: "start", xs: "center" },
					}}
				>
					<Typography
						sx={{
							color: "#FFF",
							fontSize: { md: "56px", sm: "50px", xs: "45px" },
							fontWeight: 700,
							lineHeight: "58px",
							letterSpacing: "2px",
							textTransform: "uppercase",
						}}
					>
						ZX9 SPEAKER
					</Typography>
					<Typography
						sx={{
							color: "#FFF",
							fontSize: "15px",
							fontWeight: 500,
							lineHeight: "25px",
							opacity: 0.75,
						}}
					>
						Upgrade to premium speakers that are phenomenally built to deliver
						truly remarkable sound.
					</Typography>
					<Button
						sx={{
							backgroundColor: "secondary.main",
							color: "secondary.second",
							width: "50%",
							transition: "ease all 600ms",
							alignSelf: { xs: "center", md: "start" },
						}}
					>
						<Link
							to="/productDetail/Z3F0dJb9r3FkXBmMfzw2"
							style={{ textDecoration: "none", color: "white" }}
						>
							see product
						</Link>
					</Button>
				</CardContent>
			</Card>

			<Card
				sx={{
					backgroundImage: {
						md: `url(${imgSpeaker2_desktop})`,
						xs: `url(${imgSpeaker2_mobile})`,
						sm: `url(${imgSpeaker2_tablet})`,
					},
					width: { md: "80%", xs: "95%" },
					height: { md: "45vh", xs: "40vh" },
					m: "0 auto",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					boxShadow: "none",
					display: "flex",
					justifyContent: "flex-start",
					borderRadius: "8px",
				}}
			>
				<CardContent
					sx={{
						width: { md: "30%", xs: "80%" },
						pl: 5,
						ml: { md: 5, xs: 0 },
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						gap: "20px",
					}}
				>
					<Typography
						sx={{
							color: "#000",
							fontSize: "28px",
							fontWeight: 700,
							letterSpacing: "2px",
							textTransform: "uppercase",
						}}
					>
						ZX7 SPEAKER
					</Typography>
					<Button variant="outlined" color="secondary" sx={{ width: "60%" }}>
						<Link
							to="/productDetail/uVp6EOW3ooHwKTIVTGil"
							style={{ textDecoration: "none", color: "black" }}
						>
							see product
						</Link>
					</Button>
				</CardContent>
			</Card>

			<Card
				sx={{
					width: { md: "80%", xs: "95%" },
					m: "0 auto",
					mt: 5,
					display: "flex",
					flexDirection: { md: "row", xs: "column", sm: "row" },
					justifyContent: "space-between",
					gap: 5,
					boxShadow: "none",
					height: { xs: "60vh", sm: "40vh" },
				}}
			>
				<img src={img3_desktop} alt="" className="img_mobile_earphone3" />
				<CardContent
					sx={{
						backgroundColor: "#f1f1f1",
						width: { md: "45%", xs: "100%" },
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "flex-start",
						gap: { md: 5, sm: 2, xs: 3 },
						pl: { md: 10, sm: 2.5 },
						height: { xs: "50%", sm: "100%" },
					}}
				>
					<Typography
						sx={{
							color: "#000",
							fontSize: { md: "28px", sm: "25px" },
							fontWeight: 700,
							letterSpacing: "2px",
							textTransform: "uppercase",
						}}
					>
						YX1 EARPHONES
					</Typography>
					<Button
						color="secondary"
						variant="outlined"
						sx={{ width: { md: "64%", xs: "60%", sm: "80%" } }}
					>
						<Link
							to="/productDetail/QmseFohhzZfwQ7dqVeih"
							style={{ textDecoration: "none", color: "black" }}
						>
							see product
						</Link>
					</Button>
				</CardContent>
			</Card>

			<CardBringingContainer />
		</div>
	);
};

export default Home;
