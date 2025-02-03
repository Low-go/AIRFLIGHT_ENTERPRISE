import React from 'react';
import { Box, Typography, Paper, Fade, useTheme } from "@mui/material";
// import { useCompany } from "../../contexts/CompanyContext";
import { tokens } from "../../theme";

function ContactsInfo() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        flex="1"
        p="20px"
        borderRadius="5px"
    >
        test
    </Box>
  )
}

export default ContactsInfo
