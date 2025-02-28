import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

// Create a styled Box with the glowing border animation
const GlowingBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "#e2e8f0",
  border: "4px solid #3b82f6", // Start with a blue border
  width: "155px",
  position: "relative",
  animation: "glowingBorder 3s infinite alternate",
  "@keyframes glowingBorder": {
    "0%": {
      borderColor: "#3b82f6", // Dark blue
      boxShadow: "0 0 5px #3b82f6",
    },
    "50%": {
      borderColor: "#60a5fa", // Medium blue
      boxShadow: "0 0 15px #60a5fa",
    },
    "100%": {
      borderColor: "#93c5fd", // Soft blue
      boxShadow: "0 0 10px #93c5fd",
    },
  },
}));

const BigNode = ({ data }) => {
  return (
    <GlowingBox>
      <Box
        padding={1.5}
        borderBottom="1px solid #bbbdbf"
      >
        <Typography variant="body1" fontWeight="bold">
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