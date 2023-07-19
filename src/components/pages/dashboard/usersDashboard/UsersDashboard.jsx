import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox } from "@mui/material";
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
		<div>
			UsersDashboard
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
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
									<Checkbox  color="primary" />
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default UsersDashboard;
