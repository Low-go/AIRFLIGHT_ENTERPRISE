import React from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../theme';

const RightScreen = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            flex="1" 
            bgcolor={colors.primary[400]}
            p="20px"
            borderRadius="4px"
        >
            <Typography variant="h6" color={colors.grey[100]}>
                Right Grid Content
            </Typography>
        </Box>
    )
}

export default RightScreen
