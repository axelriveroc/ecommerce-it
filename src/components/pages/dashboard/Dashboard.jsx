import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalDashboard from "../../common/modalDashboard/ModalDashboard";

const Dashboard = ({productsList, viewByID, editByID, deleteByID, open, handleClose, disabled, data}) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">PRICE</TableCell>
              <TableCell align="right">STOCK</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsList.map((p) => (
              <TableRow
                key={p.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {p.name}
                </TableCell>
                <TableCell align="right">{p.id}</TableCell>
                <TableCell align="right">{p.price}</TableCell>
                <TableCell align="right">{p.stock}</TableCell>
                <TableCell align="right">
                  
                 <IconButton onClick={() => viewByID(p) }>
                  <VisibilityIcon />
                 </IconButton>
                 <IconButton onClick={() => editByID(p) }>
                  <EditIcon />
                 </IconButton>
                 <IconButton onClick={() => deleteByID(p) }>
                  <DeleteForeverIcon />
                 </IconButton>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDashboard  open={open} handleClose={handleClose} disabled={disabled} data={data} />
    </div>
  );
}

export default Dashboard