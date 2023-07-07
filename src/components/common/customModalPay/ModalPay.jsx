import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
	position: "absolute",
	top: {sm:"45%", xs:"50%"},
	right: {sm:"0%", xs:"-10%"},
	transform: {sm:"translate(-25%, -50%)", xs:"translate( -25%, -50%)"},
	width: {sm:500, xs:250},
	bgcolor: "background.paper",
	p: 3,
	minHeight: "400px",
	border: "none",
	boxShadow: "none",
	borderRadius: "8px",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-around",
  height:{sm:"70vh", xs:"90%"}

};
const ModalPay = ({ handleClose, open, cart, total }) => {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<CheckCircleIcon color="primary" fontSize="large" />
					<Typography
						id="modal-modal-title"
						variant="h6"
						sx={{
							fontWeight: 700,
							fontSize: {sm:"32px", xs:"25px"},
							lineHeight: 1,
							letterSpacing: "1.143px",
						}}
					>
						THANK YOU FOR YOUR ORDER
					</Typography>
					<Typography
						variant="body2"
						sx={{
							fontSize: {sm:"15px",xs:"13px"},
							fontWeight: 500,
							lineHeight: {sm:"25px", xs:"16px"},
							opacity: 0.5,
						}}
					>
						You will receive an email confirmation shortly
					</Typography>
					{cart.length >= 1 && (
						<Box
							sx={{
								display: "flex",
                flexDirection:{sm:"row", xs:"column"},
								justifyContent: "center",
                borderRadius:"8px",
                height:{sm:"40%", xs:"50%"}
							}}
						>
							<Box
								sx={{
									backgroundColor: "#f1f1f1",
									width: "100%",
									display: "flex",
									flexDirection: "column",
                  justifyContent:{sm:"center", xs:"space-evenly"},
                  gap:{sm:1.2, xs:0.1},
                  height:{xs:"60%", sm:"100%"},
                  borderRadius:{sm:"8px 0 0 8px ", xs:"8px 8px 0 0"}
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "flex-start",
										justifyContent: "space-between",
										p: 1,
                    width:"80%",
                    alignSelf:"center"
									}}
								>
									<Box
										sx={{
											display: "flex",
											width: "80%",
											gap: 1,
										}}
									>
										<img src={cart[0].image} width={60} height={60} />
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<h4>{cart[0].subname}</h4>
											<Typography variant="body2" sx={{opacity:0.5}}>${cart[0].price}</Typography>
										</Box>
									</Box>
									<h5 style={{opacity:0.5}}>x{cart[0].quantity}</h5>
								</Box>
								<Divider
									color="#000"
									width="90%"
									sx={{ alignSelf: "center", opacity: 0.08 }}
								/>
								<Box sx={{ alignSelf: "center" }}>
									<Typography
										variant="body2"
										sx={{ opacity: 0.5, color: "#000" }}
									>
										and {cart.length - 1} other item(s){" "}
									</Typography>
								</Box>
							</Box>

							<Box
								sx={{
									width: "100%",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
                  backgroundColor:"#000",
                  height:{xs:"40%", sm:"100%"},
                  borderRadius:{sm:"0 8px 8px 0", xs:"0 0 8px 8px"}

								}}
							>
								<div>
									<Typography
										sx={{
											color: "#FFF",
											fontSize: "15px",
											fontWeight: 500,
											lineHeight: "25px",
											opacity: 0.5,
										}}
									>
										GRAND TOTAL
									</Typography>
									<Typography
										sx={{
											textAlign: "start",
											color: "#FFF",
											fontSize: "18px",
											fontWeight: 700,
										}}
									>
										${(total * 0.21 + total * 0.15 + total).toFixed(2)}
									</Typography>
								</div>
							</Box>
						</Box>
					)}

					<Link to="/">
						<Button variant="contained" onClick={handleClose} fullWidth>
							Back To Home
						</Button>
					</Link>
				</Box>
			</Modal>
		</div>
	);
};

export default ModalPay;
