import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { db } from "../../../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import "./UserStyles.css";
import Swal from "sweetalert2";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputBaseC from "../../../common/inputBase/InputBaseC";

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

    "&:hover": {
      backgroundColor: " #d4f1c5",
    },
  }));

  const handleChangeCheckbox = async (e, id, name) => {
    const isChecked = e.target.checked;
    Swal.fire({
      title: `Seguro quieres cambiar de rol a: ${name} ? `,
      showDenyButton: true,
      confirmButtonText: "Cambiar rol",
      denyButtonText: `Cancelar `,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Actualizar el estado del usuario correspondiente en el arreglo "users"
        const updatedUsers = users.map((user) =>
          user.id === id
            ? { ...user, rol: isChecked ? "admin" : "customer" }
            : user
        );
        setUsers(updatedUsers); // Actualizar el estado del arreglo "users"
        try {
          let refDoc = doc(db, "users", id); // accedo al id del user xq se lo pase como props
          updateDoc(refDoc, { rol: isChecked ? "admin" : "customer" }); // UPDATEDOC = PATCH --> le paso el product de mi DB y luego las prop que modifico
          setChangesUsers(true);
        } catch (error) {
          console.error(error);
        }

        Swal.fire("Modificado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Queda como estaba", "", "info");
      }
    });
  };

  const [openRow, setOpenRow] = useState({}); // Estado local para controlar si se muestra o no la información abajo de la fila

  const handleRowClick = (id) => {
    setOpenRow((prevOpenRow) => ({
      ...prevOpenRow,
      [id]: !prevOpenRow[id], // Cambiar el estado de la fila específica (si está cerrada, se abrirá; si está abierta, se cerrará)
    }));
  };
  console.log(users);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter((user) => {
    // Convierte tanto el displayName como el email a minúsculas para hacer la búsqueda insensible a mayúsculas
    const userDisplayName = user.displayName.toLowerCase();
    const userEmail = user.email.toLowerCase();

    // Verifica si el término de búsqueda está incluido en el nombre o email del usuario
    return (
      userDisplayName.includes(searchTerm.toLowerCase()) ||
      userEmail.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box
      sx={{
        background: "rgb(25,25,25)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: 2,
      }}
    >
      <Typography variant="h3" sx={{ color: "#f0f0f0", textAlign: "center" }}>
        Users Dashboard
      </Typography>

      <InputBaseC
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        text={"usuarios"}
      />
      <TableContainer
        component={Paper}
        sx={{ width: "100%", m: "0 auto", mb: 7 }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ display: { sm: "table-cell", md: "none" } }}
              ></StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ display: { sm: "none", md: "table-cell", xs: "none" } }}
              >
                ID
              </StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Rol</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(({ id, displayName, email, rol }) => (
              <>
                <StyledTableRow key={id} className="styled-table-row">
                  <TableCell sx={{ display: { sm: "table-cell", md: "none" } }}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      //onClick={() => setOpenRow(!openRow)} // Al hacer click en el icono, cambia el estado "open"
                      onClick={() => handleRowClick(id)}
                    >
                      {openRow[id] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    {displayName}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    className="td_users"
                    sx={{
                      display: { sm: "none", md: "table-cell", xs: "none" },
                      fontWeight: "bold",
                    }}
                  >
                    {id}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    className="td_users"
                    sx={{ fontWeight: "bold" }}
                  >
                    {email}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="td_users">
                    <FormControlLabel
                      sx={{
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        ml: 0,
                        mr: 1,

                        pr: 0.7,
                      }}
                      control={
                        <Checkbox checked={rol === "admin" ? true : false} />
                      }
                      label="Admin"
                      name="new"
                      onChange={(e) => handleChangeCheckbox(e, id, displayName)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={openRow[id]} timeout="auto" unmountOnExit>
                      <Typography variant="body2"> ID: {id}</Typography>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersDashboard;
