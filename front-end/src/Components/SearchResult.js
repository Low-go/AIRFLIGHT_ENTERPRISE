import React from 'react';
import { ListItem, ListItemButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';
import { useCompany } from '../contexts/CompanyContext';


const SearchResult = ({ result }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { handleCompanySelect } = useCompany();

    // calls company context
    const handleClick = () => {
      handleCompanySelect(result);
    }
    
    return (
      <ListItem disablePadding>
        <ListItemButton
        onClick={handleClick}
          sx={{
            py: 1,
            px: 2,
            '&:hover': {
              backgroundColor: colors.primary[600],
            },
          }}
        >
          <Typography>
            {result.company_name}
          </Typography>
        </ListItemButton>
      </ListItem>
    );
  };

export default SearchResult