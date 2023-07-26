import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { db } from "../../../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const UsersDashboard = ({ users, setUsers, setChangesUsers }) => {
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

  const handleChangeCheckbox = async (e, id) => {
    const isChecked = e.target.checked;
    // Actualizar el estado del usuario correspondiente en el arreglo "users"
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, rol: isChecked ? "admin" : "customer" } : user
    );
    setUsers(updatedUsers); // Actualizar el estado del arreglo "users"
    try {
      let refDoc = doc(db, "users", id); // accedo al id del user xq se lo pase como props
      updateDoc(refDoc, { rol: isChecked ? "admin" : "customer" }); // UPDATEDOC = PATCH --> le paso el product de mi DB y luego las prop que modifico
      setChangesUsers(true);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(users);

  return (
    <Box sx={{ background: "rgb(25,25,25)", display:"flex", flexDirection:"column", justifyContent:"space-around", gap:2 }}>
      <Typography variant="h3" sx={{ color: "#f0f0f0", textAlign:"center" }}>Users Dashboard</Typography>

      <TableContainer component={Paper} sx={{ width: "100%", m: "0 auto", mb:7}}>
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
                    control={
                      <Checkbox checked={rol === "admin" ? true : false} />
                    }
                    label="Admin"
                    name="new"
                    onChange={(e) => handleChangeCheckbox(e, id)}
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
