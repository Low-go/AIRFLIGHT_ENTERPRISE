import React from 'react';
import { Box, List, useTheme } from '@mui/material';
import { tokens } from '../theme';
import SearchResult from './SearchResult';

export const SearchResultsList = ({ results }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    console.log('SearchResultsList rendering with results:', results);
   
    if (results.length === 0) return null;
 
    return (
      <Box
        sx={{
          width: '100%',
          backgroundColor: colors.primary[400],
          borderRadius: '10px',
          maxHeight: '100%',
          overflowY: 'auto',
        }}
      >
        <List sx={{ p: 0 }}>
          {results.map((result, id) => (
            <SearchResult result={result} key={id} />
          ))}
        </List>
      </Box>
    );
  };
 
export default SearchResultsList;