import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { Handle, Position } from "@xyflow/react";


const BoxFrame = styled(Box)(({ isDarkMode }) => ({
    borderRadius: "5px",
    backgroundColor: isDarkMode ? "#7B8D99" : "#e2e8f0",
    border: isDarkMode ? "3px solid #3da58a" : "3px solid #ff7e50", // Darker coral for light mode
    width: "100px",
    height: "70px",
    position: "relative",
    animation: isDarkMode 
        ? "smallNodeGlowingBorderDark 3s infinite alternate" 
        : "smallNodeGlowingBorderLight 3s infinite alternate",
    "@keyframes smallNodeGlowingBorderDark": {
        "0%": { borderColor: "#3da58a", boxShadow: "0 0 5px #3da58a" },
        "50%": { borderColor: "#4cceac", boxShadow: "0 0 15px #4cceac" },
        "100%": { borderColor: "#70d8bd", boxShadow: "0 0 10px #70d8bd" },
    },
    
    "@keyframes smallNodeGlowingBorderLight": {
        "0%": { borderColor: "#ff7e50", boxShadow: "0 0 5px #ff7e50" }, // Darker coral
        "50%": { borderColor: "#ff9770", boxShadow: "0 0 15px #ff9770" }, // Medium coral
        "100%": { borderColor: "#ffb196", boxShadow: "0 0 10px #ffb196" }, // Lighter coral
    },
}));

const SmallNode = ({ data, isDarkMode }) => {


    return (
        <BoxFrame isDarkMode={isDarkMode}>

            <Handle
                id = "left-handle"
                type="target"
                position={Position.Left}
                style={{ background: '#555', width: '10px', height: '10px' }}
                
            />

            <Box
                padding={.5}
                borderBottom= "1px solid #bbbdbf"
            >
                <Typography variant="body1" fontWeight="bold">
                    {data.name}
                </Typography>
            </Box>
        </BoxFrame>
    );
}

export default SmallNode;