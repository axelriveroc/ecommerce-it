import { Box, Button, Modal, TextField } from "@mui/material";

const ModalDashboard = ({ open, data, handleClose, disabled }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  console.log(data);
  console.log(disabled);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <TextField
              name="name"
              defaultValue={data.name}
              disabled={disabled}
            />

            {!disabled && <Button type="submit">Enviar</Button>}
            <Button type="button" onClick={handleClose}>
              Cerrar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDashboard;
