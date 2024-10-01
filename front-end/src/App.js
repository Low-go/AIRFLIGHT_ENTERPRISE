import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar'; 
import { SIDEBAR_WIDTH } from './constants';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` }
        }}
      >
        <Navbar /> 
        <Toolbar /> 
        <Box sx={{ p: 3 }}>
          <Typography>
            This is where main content goes
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default App;