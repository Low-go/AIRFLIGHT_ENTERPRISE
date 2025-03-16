import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { Handle, Position } from "@xyflow/react";

// Create a styled Box with the glowing border animation
const MediumBox = styled(Box)(({ isDarkMode }) => ({
  

  borderRadius: "8px",
  backgroundColor: isDarkMode ? "#7B8D99" : "#e2e8f0",
  border: "4px solid #3b82f6",
  width: "130px",
  height: "90px",
  position: "relative",
  animation: isDarkMode ? "mediumglowingBorderDark 2.5s infinite alternate" : "mediumglowingBorderLight 2.5s infinite alternate",
    
  "@keyframes mediumglowingBorderDark": {
    "0%": { borderColor: "#3b82f6", boxShadow: "0 0 5px #3b82f6" },
    "50%": { borderColor: "#60a5fa", boxShadow: "0 0 15px #60a5fa" },
    "100%": { borderColor: "#93c5fd", boxShadow: "0 0 10px #93c5fd" },
  },
  
  "@keyframes mediumglowingBorderLight": {
    "0%": { borderColor: "#ec4899", boxShadow: "0 0 5px #ec4899" },
    "50%": { borderColor: "#f472b6", boxShadow: "0 0 15px #f472b6" },
    "100%": { borderColor: "#f9a8d4", boxShadow: "0 0 10px #f9a8d4" },
  },
}));

const MediumNode = ({ data, isDarkMode }) => {


  return (
    <MediumBox isDarkMode={isDarkMode}>

      <Handle
        id = 'medium-handle'
        type="target"
        position={Position.Left} // might need to change later, handles where the line starts
        style={{ background: '#555', width: '10px', height: '10px' }}
        
      />

      <Box
        padding={1.5}
        borderBottom="1px solid #bbbdbf"
      >
        <Typography variant="body1" fontWeight="bold" >
          {data.name}
        </Typography>
      </Box>
     
      <Box
        padding={1.5}
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Typography variant="body2" color="textSecondary"> {/**I might not use this, leaving for now* */}
          Additional Text
        </Typography>
      </Box>
    </MediumBox>
  );
};

export default MediumNode;