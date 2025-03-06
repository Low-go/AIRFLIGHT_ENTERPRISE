import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Handle, Position } from "@xyflow/react";

// Create a styled Box with the glowing border animation
const GlowingBox = styled(Box)(({ isDarkMode }) => ({
  borderRadius: "8px",
  backgroundColor: isDarkMode ? "#7B8D99" : "#e2e8f0",
  border: "4px solid #3b82f6", // Start with a blue border
  width: "155px",
  position: "relative",
  animation: isDarkMode ? "glowingBorderDark 2.5s infinite alternate" : "glowingBorderLight 2.5s infinite alternate",
    
  "@keyframes glowingBorderDark": {
    "0%": { borderColor: "#3b82f6", boxShadow: "0 0 5px #3b82f6" },
    "50%": { borderColor: "#60a5fa", boxShadow: "0 0 15px #60a5fa" },
    "100%": { borderColor: "#93c5fd", boxShadow: "0 0 10px #93c5fd" },
  },
  
  "@keyframes glowingBorderLight": {
    "0%": { borderColor: "#ec4899", boxShadow: "0 0 5px #ec4899" },
    "50%": { borderColor: "#f472b6", boxShadow: "0 0 15px #f472b6" },
    "100%": { borderColor: "#f9a8d4", boxShadow: "0 0 10px #f9a8d4" },
  },
}));

// TODO: might wanna make these handles blue later to match the border
// Custom interactive handle component
const InteractiveHandle = styled(Handle)(({ isHovered }) => ({
  background: '#555',
  width: isHovered ? '14px' : '10px',
  height: isHovered ? '14px' : '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    background: '#888',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
  }
}));

const BigNode = ({ data, isDarkMode }) => {
  // lol this is stupid but i wanna remember the hover trick for other components
  const [topHandleHovered, setTopHandleHovered] = useState(false);
  const [bottomHandleHovered, setBottomHandleHovered] = useState(false);

  const handleTopClick = () => {
    console.log("Top handle clicked!");
    console.log("Node data:", data);
  };

  const handleBottomClick = () => {
    console.log("Bottom handle clicked!");
    console.log("Node data:", data);
    // note to self: add event emit here for the flow designer later
  };

  return (
    <GlowingBox isDarkMode={isDarkMode}>
      <div 
        onClick={handleTopClick}
        onMouseEnter={() => setTopHandleHovered(true)}
        onMouseLeave={() => setTopHandleHovered(false)}
        style={{ position: 'absolute', right: -3, top: '30%', width: 20, height: 20, zIndex: 10 }}
      >
        <InteractiveHandle
          id="top-right-handle"
          type="source"
          position={Position.Right}
          isHovered={topHandleHovered}
          style={{ top: 0 }}
        />
      </div>
      {/* all this just so I can make some dumb circles get large and work as buttons */}

      
      <div 
        onClick={handleBottomClick}
        onMouseEnter={() => setBottomHandleHovered(true)}
        onMouseLeave={() => setBottomHandleHovered(false)}
        style={{ position: 'absolute', right: -3, top: '70%', width: 20, height: 20, zIndex: 10 }}
      >
        <InteractiveHandle
          id="bottom-right-handle"
          type="source"
          position={Position.Right}
          isHovered={bottomHandleHovered}
          style={{ top: 0 }}
        />
      </div>
      
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
        <Typography variant="body2" color="textSecondary">
          Additional Text
        </Typography>
      </Box>
    </GlowingBox>
  );
};

export default BigNode;