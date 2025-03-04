import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { Handle, Position } from "@xyflow/react";


const BoxFrame = styled(Box)(({ isDarkMode }) => ({

    borderRadius: "5px", //lets try these values
    backgroundColor: isDarkMode ? "#7B8D99" : "#e2e8f0",  // replace
    border: isDarkMode ? "3px solid #3da58a" : "3px solid #ff66a1",
    width: "120px",
    position: "relative",
    animation: isDarkMode ? "smallNodeGlowingBorderDark 3s infinite alternate" : "smallNodeGlowingBorderLight 3s infinite alternate",

    "@keyframes smallNodeGlowingBorderDark": {
        "0%": { borderColor: "#3da58a", boxShadow: "0 0 5px #3da58a" }, // greenAccent[400]
        "50%": { borderColor: "#4cceac", boxShadow: "0 0 15px #4cceac" }, // greenAccent[500]
        "100%": { borderColor: "#70d8bd", boxShadow: "0 0 10px #70d8bd" }, // greenAccent[600]
    },
    
    "@keyframes smallNodeGlowingBorderLight": {
        "0%": { borderColor: "#ff66a1", boxShadow: "0 0 5px #ff66a1" }, // customAccent.light
        "50%": { borderColor: "#ff0071", boxShadow: "0 0 15px #ff0071" }, // customAccent.main
        "100%": { borderColor: "#cc005a", boxShadow: "0 0 10px #cc005a" }, // customAccent.dark
    },
}));

const SmallNode = ({ data, isDarkMode }) => {


    return (
        <BoxFrame isDarkMode={isDarkMode}>

            <Handle
                type="target"
                position={Position.Top}
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