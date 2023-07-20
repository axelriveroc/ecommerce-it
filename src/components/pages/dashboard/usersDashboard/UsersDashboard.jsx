import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
const UsersDashboard = ({ users }) => {
	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		"&:last-child td, &:last-child th": {
			border: 0,
		},
	}));


	return (
		<Box sx={{background:"rgba(255, 255, 255, 0.12)"}}>
			UsersDashboard
			<TableContainer component={Paper}  sx={{width:"80%", m: "0 auto" }}>
				<Table aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell align="right">ID</StyledTableCell>
							<StyledTableCell align="right">Email</StyledTableCell>
							<StyledTableCell align="right">Rol</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(({ id, displayName, email, rol }) => (
							<StyledTableRow key={id}>
								<StyledTableCell component="th" scope="row">
									{displayName}
								</StyledTableCell>
								<StyledTableCell align="right">{id}</StyledTableCell>
								<StyledTableCell align="right">{email}</StyledTableCell>
								<StyledTableCell align="right">
									<FormControlLabel
										sx={{
											minWidth: 120,
											boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
											backgroundColor: "rgba(255, 255, 255, 0.8)",
											ml: 0,
											mr: 0,
											p: 0.5,
										}}
										
										control={<Checkbox  defaultChecked={rol === "admin" ? true : false}/>}
										label="Admin"
										name="new"
									/>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default UsersDashboard;
