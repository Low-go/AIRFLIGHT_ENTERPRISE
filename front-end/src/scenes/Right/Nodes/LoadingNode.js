import React from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";

const LoadingNode = ({ data, isDarkMode }) => {
  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? "#1F2937" : "#f9fafb",
        borderRadius: "8px",
        padding: "16px",
        width: "130px",
        height: "90px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${isDarkMode ? "#3b82f6" : "#ec4899"}`,
        boxShadow: `0 0 10px ${isDarkMode ? "#3b82f6" : "#ec4899"}`,
      }}
    >
      <Handle
        id="medium-handle"
        type="target"
        position={Position.Left}
        style={{ background: '#555', width: '10px', height: '10px' }}
      />
      
      <CircularProgress size={30} color={isDarkMode ? "primary" : "secondary"} />
      <Typography variant="body2" sx={{ mt: 1 }}>
        Loading {data.type}...
      </Typography>
    </Box>
  );
};

export default LoadingNode;