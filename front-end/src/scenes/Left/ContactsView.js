import React from 'react';
import { Box, useTheme, Button } from '@mui/material';
import { tokens } from '../../theme';

const ContactsView = ({ onBack }) => {

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
        borderRadius= "8px"
    >
        <Button
            onClick={onBack}
        >
            Test Back
        </Button>
    </Box>
  )
}

export default ContactsView
