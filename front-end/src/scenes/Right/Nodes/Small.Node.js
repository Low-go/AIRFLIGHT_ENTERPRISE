import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Position } from "@xyflow/react";
import InteractiveHandle from "../../../Components/InteractiveHandle";

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
        "0%": { borderColor: "#00FFCC", boxShadow: "0 0 5px #00FFCC" },
        "50%": { borderColor: "#33FFC1", boxShadow: "0 0 15px #33FFC1" },
        "100%": { borderColor: "#66FFDD", boxShadow: "0 0 10px #66FFDD" },
    },
   
    "@keyframes smallNodeGlowingBorderLight": {
        "0%": { borderColor: "#ff7e50", boxShadow: "0 0 5px #ff7e50" }, // Darker coral
        "50%": { borderColor: "#ff9770", boxShadow: "0 0 15px #ff9770" }, // Medium coral
        "100%": { borderColor: "#ffb196", boxShadow: "0 0 10px #ffb196" }, // Lighter coral
    },
}));

const SmallNode = ({ data, isDarkMode, onHandleClick, id }) => {
    // lol this is stupid but i wanna remember the hover trick for other components
    const [leftHandleHovered, setLeftHandleHovered] = useState(false);
    const [rightHandleHovered, setRightHandleHovered] = useState(false);
    
    const handleLeftClick = () => {
        console.log("Left handle clicked!");
        console.log("Node data:", data);
    };
    
    const handleRightClick = () => {
        console.log("Right handle clicked!");
        console.log("Node data:", data);
        // note to self: add event emit here for the flow designer later
    };
    
    return (
        <BoxFrame isDarkMode={isDarkMode}>
            <div
                onClick={handleLeftClick}
                onMouseEnter={() => setLeftHandleHovered(true)}
                onMouseLeave={() => setLeftHandleHovered(false)}
                style={{ position: 'absolute', left: -3, top: '50%', width: 20, height: 20, zIndex: 10 }}
            >
                <InteractiveHandle
                    id="left-handle"
                    type="target"
                    position={Position.Left}
                    isHovered={leftHandleHovered}
                    style={{ top: 0 }}
                />
            </div>
            
            <div
                onClick={() => onHandleClick(id, "right-handle")}
                onMouseEnter={() => setRightHandleHovered(true)}
                onMouseLeave={() => setRightHandleHovered(false)}
                style={{ position: 'absolute', right: -3, top: '50%', width: 20, height: 20, zIndex: 10 }}
            >
                <InteractiveHandle
                    id="right-handle"
                    type="source"
                    position={Position.Right}
                    isHovered={rightHandleHovered}
                    style={{ top: 0 }}
                />
            </div>
            
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