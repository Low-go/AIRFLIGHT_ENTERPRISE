import React from 'react';
import { ListItem, ListItemButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';


const SearchResult = ({ result }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
      <ListItem disablePadding>
        <ListItemButton
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