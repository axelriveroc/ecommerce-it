import { Box, Button, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "45%",
  right: "0%",
  transform: "translate(-25%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  minHeight: "400px"
};

const CustomModal = ({open, handleClose}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Link to="/checkout">
            <Button variant="contained" onClick={handleClose}>
                CheckOut
            </Button>
          </Link>
          
        </Box>
      </Modal>
    </div>
  );
}

export default CustomModal