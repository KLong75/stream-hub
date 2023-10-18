import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PaperUnderlay = styled(Paper)(() => ({
  backgroundColor: "rgba(0, 0, 0, 0.5)", 
  color: "#fff", 
  padding: ".25rem", 
  backdropFilter: "blur(3px)", 
  borderRadius: ".5rem", 
  border: "2px solid #333", 
  width: "fit-content",
  margin: "auto",
  minWidth: "20%",
  maxWidth: "80%",
  minHeight: "50%",
  maxHeight: "80%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  textAlign: "center",
  boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
}));
