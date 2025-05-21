import { Box, Typography, Button, useTheme, Snackbar } from '@mui/material';
import { tokens } from '../../theme';
import { useCompany } from '../../contexts/CompanyContext';
import { useState } from 'react';
import DeleteModal from '../../Components/DeleteModal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const PartInfo = ({ onBack, part, onNavigateToEdit, fleet }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany } = useCompany();

  console.log("this is a part ", part);
  console.log("this is a fleet", fleet);
  
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
        `http://127.0.0.1:8000/api/companies/${selectedCompany.id}/fleets/${fleet.id}/parts/${part.id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to delete part: ${response.status}`);
      }
      
      // Success
      showSnackbar('Part deleted successfully');
      console.log('Delete confirmed for part:', part.id);
      
      // Navigate back after a short delay to show the snackbar
      setTimeout(() => {
        onBack();
      }, 700);
    } 
    catch (err) {
      console.error('Error deleting part:', err);
      showSnackbar(`Error: ${err.message}`, 'error');
      setOpenDialog(false);
    }
  };

  //fragment for snackbar
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
            Part Information
          </Typography>
        </Box>

        {/* Part fields display */}
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
              Name
            </Typography>
            <Typography
              color={colors.customAccent.light}
              variant="h4"
              fontWeight="500"
            >
              {part.name}
            </Typography>
          </Box>

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
              color={colors.grey[100]}
              variant="h4"
            >
              {part.model}
            </Typography>
          </Box>

          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              Part Number/Identifier
            </Typography>
            <Typography
              color={colors.grey[100]}
              variant="h4"
            >
              {part.part_number_identifier || 'N/A'}
            </Typography>
          </Box>

          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              Expected Lifespan
            </Typography>
            <Typography
              color={colors.grey[100]}
              variant="h4"
            >
              {part.expected_lifespan ? `${part.expected_lifespan} days` : 'N/A'}
            </Typography>
          </Box>

          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              Manufacturer
            </Typography>
            <Typography
              color={colors.grey[100]}
              variant="h4"
            >
              {part.manufacturer || 'N/A'}
            </Typography>
          </Box>

          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              Price
            </Typography>
            <Typography
              color={colors.grey[100]}
              variant="h4"
            >
              {part.price ? `$${part.price}` : 'N/A'}
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
              {part.notes || 'No notes available'}
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
          {/* Action buttons */}
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
            onClick={() => onNavigateToEdit(part)}
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
            Edit Part
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
            Delete Part
          </Button>
        </Box>
      </Box>

      <DeleteModal 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        word="part"
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

export default PartInfo;