import React from "react";
import { tokens } from "../theme";
import InfoScreen from "../scenes/Left";
import Header from "../Components/Header";
import { Box, useTheme } from "@mui/material";

const MainInfo = () => {

    const theme = useTheme();
    const colors = tokens.apply(theme.palette.mode);

    return(
        <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="InfoScreen" subtitle="Information Displayed the Right Way" />
        </Box>

        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="stretch" 
          height="65vh"
          mt="20px"
          gap="20px"
          
        >
          <InfoScreen/>
        </Box>
      </Box>
    );
};

export default MainInfo;