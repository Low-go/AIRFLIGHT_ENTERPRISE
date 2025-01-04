import React, { useState } from 'react';
import { Box, Modal, Typography, useTheme } from "@mui/material";
import ReactDOM from 'react-dom';
import { tokens } from '../../theme';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useSidebar } from '../../contexts/SidebarContext';


// basic modal test
const SearchModal = ({ open, onClose}) => {
  
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { isCollapsed } = useSidebar();

   // gonna be used to move modal if sidebar open or not
   const sidebarWidth = isCollapsed ? 75 : 250;

   // Input variables
   const [input, setInput] = useState("");
   
   const style = {
        position: 'absolute',
        top: '26%',
        left: isCollapsed ? '50%' : `calc(50% + ${sidebarWidth / 2}px)`,
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: colors.primary[400],
        color: colors.grey[100],
        boxShadow: 24,
        p: 4,
        borderRadius: 1.5,
        border: `2px solid ${colors.customAccent.main}`,
   
   };

  return ReactDOM.createPortal(
    <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        sx={style}
        >
        <Box sx={{ border: "1px solid #ccc", 
          flex: 1, 
          borderRadius: "4px", 
          display: "flex",
          padding: "2px"}}>
          <InputBase sx={{ ml: 2, flex: 1 }} 
            placeholder="Search Company Names..."
            value = {input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton type="button" sx={{ p: 1}}>
              <SearchIcon />
          </IconButton>
        </Box>
    </Box>
    </Modal>,
    document.getElementById('modal-root')
  )
}

export default SearchModal
