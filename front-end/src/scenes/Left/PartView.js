import { Box, Typography, Button, useTheme, Snackbar } from '@mui/material';
import { tokens } from '../../theme';
import {React, useState, useEffect} from 'react';
import { useCompany } from '../../contexts/CompanyContext';

const PartView = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            flex="1"
            p="20px"
            borderRadius="8px"
            sx={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${colors.grey[800]}`,
            }}       
        >
            test
        </Box>
    )
}


export default PartView