import {
  Box,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalDashboard from "../../common/modalDashboard/ModalDashboard";

const Dashboard = ({
	productsList,
	viewByID,
	editByID,
	deleteByID,
	open,
	handleClose,
	disabled,
	data,
  setChangesProducts
}) => {
	return (
		<Box sx={{backgroundColor:"rgb(25,25,25)", minHeight:"100vh", display:"flex", flexDirection:"column", pt:2}}>
      <Typography sx={{textAlign:"center", color:"secondary.second", mb:2, fontSize:{xs:"20px", sm:"30px"}}} variant="h3">PRODUCTOS - ADMIN </Typography>
			<TableContainer component={Paper} sx={{backgroundColor:"rgb(25,25,25)", width:"95%", m:"0 auto", br:"12px"}}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead >
						<TableRow >
							<TableCell sx={{color:"primary.second"}}>NAME</TableCell>
							<TableCell align="right" sx={{color:"primary.second"}}>ID</TableCell>
							<TableCell align="right" sx={{color:"primary.second"}}>PRICE</TableCell>
							<TableCell align="right" sx={{color:"primary.second"}}>STOCK</TableCell>
							<TableCell align="right" sx={{color:"primary.second"}}>ACTIONS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{productsList.map((p) => (
							<TableRow
								key={p.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row" sx={{color:"secondary.second"}}>
									{p.name}
								</TableCell>
								<TableCell sx={{p:{xs:0.5, md:1 }, color:"secondary.second"}}  align="right"  >{p.id}</TableCell>
								<TableCell sx={{p:{xs:0.5, md:1}, color:"secondary.second"}}  align="right">${p.price}</TableCell>
								<TableCell  sx={{p:{xs:0.5, md:1}, color:"secondary.second"}} align="right" >{p.stock}</TableCell>
								<TableCell sx={{p:{xs:0.5, md:1}, color:"secondary.second"}} align="right" >
                  <Box sx={{display:"flex", flexDirection:{md:"row", sm:"column", xs:"column"}, justifyContent:"flex-end"}}>

									<IconButton onClick={() => viewByID(p)} color="info">
										<VisibilityIcon />
									</IconButton>
									<IconButton onClick={() => editByID(p)} color="success">
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => deleteByID(p)} color="error">
										<DeleteForeverIcon />
									</IconButton>
                  </Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
      <Box sx={{ width:"95%", display:"flex", justifyContent:"flex-end", mt:3}}>
        <Button variant="contained"  >Agregar producto</Button>
      </Box>
{/* 			// ESTO ES CLAVE // MONTA EL COMPONENTE MODALDASHBOARD SOLO CUANDO OPEN ES
			TRUE , PORQUE SINO LOS DATOS QUE LE PASO NO ANDAN. 🚨🚨🚨🚨🚨🚨🚨🚨🚨 */}
			{open && (
				<ModalDashboard
					open={open}
					handleClose={handleClose}
					disabled={disabled}
					data={data}
          setChangesProducts={setChangesProducts}
				/>
			)}
		</Box>
	);
};

export default Dashboard;
