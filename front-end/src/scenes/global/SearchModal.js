import React from 'react'
import { Box, Modal, Typography, useTheme } from "@mui/material";
import ReactDOM from 'react-dom';
import { tokens } from '../../theme';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";


// basic modal test
const SearchModal = ({ open, onClose}) => {
  
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   
   const style = {
        position: 'absolute',
        top: '26%',
        left: '50%',
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
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search Company Name" />
        <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
        </IconButton>
    </Box>
    </Modal>,
    document.getElementById('modal-root')
  )
}

export default SearchModal
