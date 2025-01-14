import React from 'react';
import { Box, Typography, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const FleetView = ({ onBack}) => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box
        flex="1"
        bgcolor={colors.primary[400]}
        p="20px"
        borderRadius="4px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
    >
      test
      <Button
        onClick={onBack}
      >
        Back to Main
      </Button>
    </Box>
  )
}

export default FleetView
