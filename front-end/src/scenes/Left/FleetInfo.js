import { Box, Typography, Button, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { tokens } from '../../theme';
import { useCompany } from '../../contexts/CompanyContext';
import { useState } from 'react';  // Make sure to add this import
import DeleteModal from '../../Components/DeleteModal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const FleetInfoDisplay = ({ onBack, fleet, onNavigateToEdit, onNavigateToPartView }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, fetchCompanyContacts } = useCompany();
  
  // dialogue control for delete option
  const [openDialog, setOpenDialog] = useState(false);
  
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const handleDelete = () => {
    setOpenDialog(true);
  };
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  
  
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/companies/${selectedCompany.id}/fleets/${fleet.id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to delete fleet: ${response.status}`);
      }
      
      // Successsss
      showSnackbar('Fleet deleted successfully');
      console.log('Delete confirmed for fleet:', fleet.id);
      
      // Navigate back after a short delay to show the snackbar
      setTimeout(() => {
        onBack();
      }, 700);
    } 
    catch (err) {
      console.error('Error deleting fleet:', err);
      showSnackbar(`Error: ${err.message}`, 'error');
      setOpenDialog(false);
    }
  };

  //fragment thingy
  const snackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        flex="1"
        p="20px"
        borderRadius="8px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.customAccent.main}`}
          p="15px"
          mb="20px"
        >
          <Typography
            color={colors.grey[100]}
            variant="h3"
            fontWeight="600"
          >
            Fleet Information
          </Typography>
        </Box>

        {/* The following is the model fields displayed  */}
        <Box 
          display="flex" 
          flexDirection="column" 
          gap="20px"
          mb="30px"
        >
          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              Model
            </Typography>
            <Typography
              color={colors.customAccent.light}
              variant="h4"
              fontWeight="500"
            >
              {fleet.model}
            </Typography>
          </Box>

          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              ID:
            </Typography>
            <Typography
              color={colors.grey[100]}
              variant="h4"
            >
              {fleet.id}
            </Typography>
          </Box>

          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              Fabrication Date
            </Typography>
            <Typography
              color={colors.grey[100]}
              variant="h4"
            >
              {fleet.fabrication_date}
            </Typography>
          </Box>

          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              Notes
            </Typography>
            <Typography
              color={colors.grey[100]}
              variant="h5"
              sx={{
                whiteSpace: 'pre-wrap',
                backgroundColor: colors.primary[500],
                p: "15px",
                borderRadius: "4px",
                minHeight: "100px"
              }}
            >
              {fleet.notes || 'No notes available'}
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          gap="16px"
          mt="auto"
          p="15px"
          borderTop={`4px solid ${colors.grey.border}`}
        >
          {/* buttons start here */}
          <Button
            onClick={onBack}
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': {
                backgroundColor: colors.blueAccent[600],
              }
            }}
          >
            Back
          </Button>

          <Button
            onClick={() => onNavigateToEdit(fleet)}
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': {
                backgroundColor: colors.blueAccent[600],
              }
            }}
          >
            Edit Fleet
          </Button>

          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              backgroundColor: colors.redAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': {
                backgroundColor: colors.redAccent[600],
              }
            }}
          >
            Delete Fleet
          </Button>

          <Button
            onClick={() => onNavigateToPartView()}
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': {
                backgroundColor: colors.blueAccent[600],
              }
            }}
          >
            PARTS
          </Button>
        </Box>
      </Box>

      <DeleteModal 
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      onConfirm={handleConfirmDelete}
      word = "fleet"
      />

      
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
      action={snackbarAction}
    />
      
    </>
  );
};

export default FleetInfoDisplay;


// Note I do not like where the part button is located, when
// we have fixed the functioonality lets move it