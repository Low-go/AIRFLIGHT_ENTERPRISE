import { Handle } from "@xyflow/react";
import { styled } from "@mui/material/styles";

// Custom interactive handle component
const InteractiveHandle = styled(Handle)(({ isHovered }) => ({
  background: "#555",
  width: isHovered ? "14px" : "10px",
  height: isHovered ? "14px" : "10px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    background: "#888",
    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
  },
}));

export default InteractiveHandle;
