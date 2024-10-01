import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { SIDEBAR_WIDTH } from '../constants';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: '0.5rem 80px',
  [theme.breakpoints.down('sm')]: {
    padding: '0.5rem 16px',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#61717c',
  textTransform: 'none',
  fontSize: '0.9rem',
  fontWeight: 400,
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#4a5864',
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  padding: '0.3rem 0.6rem',
  borderRadius: '20px',
  border: '1px solid #d1d5db',
  color: '#6b7280',
  textTransform: 'none',
  fontSize: '0.8rem',
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
    borderColor: '#ff0071',
    backgroundColor: 'transparent',
  },
  '& .MuiSvgIcon-root': {
    width: '14px',
    height: '14px',
  },
}));

const ResetButton = styled(Button)(({ theme }) => ({
  padding: '0.3rem 0.6rem',
  borderRadius: '20px',
  backgroundColor: '#ff0071',
  color: 'white',
  textTransform: 'none',
  fontSize: '0.8rem',
  fontWeight: 400,
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
    backgroundColor: '#e0006a',
  },
}));

const navItems = ['Information', 'Video Tutorial', 'TipMe'];

function Navbar() {
  return (
    <AppBar 
      position="fixed" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        ml: `${SIDEBAR_WIDTH}px`,
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          AIRFLIGHT ENTERPRISE
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '1rem',
          ml: 'auto'
        }}>
          {navItems.map((item) => (
            <NavButton key={item}>
              {item}
            </NavButton>
          ))}
          
          <SearchButton startIcon={<SearchIcon />}>
            Search
          </SearchButton>
          
          <ResetButton>
            Reset Tree
          </ResetButton>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar;