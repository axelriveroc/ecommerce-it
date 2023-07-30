import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function InputBaseC({ setSearchTerm, searchTerm, text }) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "80%",
        alignSelf: "center",
        m: 2,
        backgroundColor: "transparent",
        border: "1px solid white",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color:"primary.main" }}
        placeholder={`Buscar ${text}... `}
        inputProps={{ "aria-label": "search google maps" }}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px", color:"primary.main" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
