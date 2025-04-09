import React from "react";
import { tokens } from "../theme";
import Header from "../Components/Header";
import { Box, useTheme } from "@mui/material";
import RightScreen from "../scenes/Right/RightScreen";

const NodePage = () => {

    const theme = useTheme();
    const colors = tokens.apply(theme.palette.mode);

    return(
        <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="NodesPage" subtitle="Visualized Tree-Based Hiearchy" />
        </Box>

        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="stretch" 
          height="65vh"
          mt="20px"
          gap="20px"
          
        >
          <RightScreen/>
        </Box>
      </Box>
    );
};

export default NodePage;