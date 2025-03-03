import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";



const BoxFrame = styled(Box)(({ isDarkMode }) => ({

    borderRadius: "5px", //lets try these values
    backgroundColor: isDarkMode ? red : blue,  // replace
    width: "120px",
    position: "relative",
}));

const SmallNode = ({ data, isDarkMode }) => {


    return (
        <BoxFrame isDarkMode={isDarkMode}>
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