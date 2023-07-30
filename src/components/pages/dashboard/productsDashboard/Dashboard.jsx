import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
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
import ModalDashboard from "../../../common/modalDashboard/ModalDashboard";
import ModalCreateProd from "../../../common/modalCreateProd/ModalCreateProd";
import InputBaseC from "../../../common/inputBase/InputBaseC";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Dashboard = ({
  viewByID,
  editByID,
  deleteByID,
  open,
  handleClose,
  disabled,
  data,
  setChangesProducts,
  openCreate,
  handleCloseCreate,
  setOpenCreate,
  filteredProducts,
  setSearchTerm,
  searchTerm,
  openOptions,
  handleClick,
  handleCloseOptions,
  anchorEls,
}) => {
  const ITEM_HEIGHT = 48;

  const handleViewClick = (product) => {
    viewByID(product);
  };

  const handleEditClick = (product) => {
    editByID(product);
  };

  const handleDeleteClick = (product) => {
    deleteByID(product);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(25,25,25)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        pt: 2,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          color: "secondary.second",
          mb: 2,
          fontSize: { xs: "20px", sm: "30px" },
        }}
        variant="h3"
      >
        PRODUCTOS - ADMIN{" "}
      </Typography>

      <InputBaseC
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        text={"Productos"}
      />

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgb(25,25,25)",
          width: "95%",
          m: "0 auto",
          br: "12px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "primary.second", p: { xs: 0, sm: 1 } }}>
                NAME
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "primary.second",
                  p: { xs: 0.5, sm: 1 },
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                ID
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "primary.second", p: { xs: 0.5, sm: 1 } }}
              >
                PRICE
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "primary.second", p: { xs: 0.5, sm: 1 } }}
              >
                STOCK
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "primary.second", p: { xs: 0.5, sm: 1 } }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((p) => (
              <TableRow
                key={p.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  p: { xs: 0.5, sm: 1 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "secondary.second" }}
                >
                  {p.name}
                </TableCell>
                <TableCell
                  sx={{
                    p: { xs: 0.5, md: 1 },
                    color: "secondary.second",
                    display: { xs: "none", sm: "table-cell" },
                  }}
                  align="right"
                >
                  {p.id}
                </TableCell>
                <TableCell
                  sx={{ p: { xs: 0.5, md: 1 }, color: "secondary.second" }}
                  align="right"
                >
                  ${p.price}
                </TableCell>
                <TableCell
                  sx={{ p: { xs: 0.5, md: 1 }, color: "secondary.second" }}
                  align="right"
                >
                  {p.stock}
                </TableCell>
                <TableCell
                  sx={{ p: { xs: 0.5, md: 1 }, color: "secondary.second" }}
                  align="right"
                >
                  <Box
                    sx={{
                      display: { md: "flex", sm: "flex", xs: "none" },
                      flexDirection: { md: "row", sm: "column", xs: "column" },
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
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

                  <Box
                    sx={{
                      display: { md: "none", sm: "none", xs: "flex" },
                      flexDirection: { md: "row", sm: "row", xs: "column" },
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      aria-label="more"
                      //id="long-button"
                      id={`long-button-${p.id}`}
                      //aria-controls={openOptions ? "long-menu" : undefined}
                      //aria-expanded={openOptions ? "true" : undefined}
                      aria-controls={
                        openOptions ? `long-menu-${p.id}` : undefined
                      } // Usa el id del producto para identificar cada menú
                      aria-expanded={openOptions ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, p)}
                      sx={{ color: "primary.second" }}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      /*   id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }} */
                      id={`long-menu-${p.id}`} // Usa el id del producto para identificar cada menú
                      MenuListProps={{
                        "aria-labelledby": `long-button-${p.id}`, // Usa el id del producto para identificar cada botón
                      }}
                      //anchorEl={anchorEl}
                      /*open={openOptions}
                      onClose={handleCloseOptions} */
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                          backgroundColor: "rgb(25,25,25)",
                        },
                      }}
                      anchorEl={anchorEls[p.id]} // Usa el id del producto para obtener el estado anchorEl correspondiente
                      open={Boolean(anchorEls[p.id])} // Verifica si el menú debe estar abierto para este producto
                      onClose={() => handleCloseOptions(p.id)} // Usa el id del producto para identificar cada menú que se va a cerrar
                    >
                      <MenuItem>
                        <IconButton
                          onClick={() => handleViewClick(p)}
                          color="info"
                          sx={{ gap: 1 }}
                        >
                          <VisibilityIcon /> <small> ver  </small>
                        </IconButton>
                      </MenuItem>
                      <MenuItem>
                        <IconButton
                          onClick={() => handleEditClick(p)}
                          color="success"
                          sx={{ gap: 1 }}
                        >
                          <EditIcon /> <small> editar </small>
                        </IconButton>
                      </MenuItem>
                      <MenuItem>
                        <IconButton
                          onClick={() => handleDeleteClick(p)}
                          color="error"
                          sx={{ gap: 1 }}
                        >
                          <DeleteForeverIcon /> <small> eliminar </small>
                        </IconButton>
                      </MenuItem>
                    </Menu>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          width: "95%",
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
        }}
      >
        <Button variant="contained" onClick={() => setOpenCreate(true)}>
          Agregar producto
        </Button>
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

      {openCreate && (
        <ModalCreateProd
          open={openCreate}
          handleClose={handleCloseCreate}
          setChangesProducts={setChangesProducts}
        />
      )}
    </Box>
  );
};

export default Dashboard;
