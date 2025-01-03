import React from 'react'
import { Box, Modal, Typography, useTheme } from "@mui/material";
import ReactDOM from 'react-dom';
import { tokens } from '../../theme';


// basic modal test
const SearchModal = ({ open, onClose}) => {
  
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   
   const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: colors.primary[400],
        color: colors.grey[100],
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        border: '1px solid red'
   };

  return ReactDOM.createPortal(
    <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </Box>
    </Modal>,
    document.getElementById('modal-root')
  )
}

export default SearchModal
