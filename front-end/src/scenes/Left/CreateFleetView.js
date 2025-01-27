import React from 'react';
import { Box, Typography, Button, useTheme } from "@mui/material";
import { tokens } from '../../theme';


const CreateFleetView = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

  return (
    <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        flex = "1"
        p ="20px"
    >
        test
    </Box>
  )
}

export default CreateFleetView
