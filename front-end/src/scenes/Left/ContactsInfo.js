import { Box, Typography, Button, useTheme, Snackbar } from '@mui/material';
import { tokens } from '../../theme';
import { useCompany } from '../../contexts/CompanyContext';
import { useState } from 'react';
import DeleteModal from '../../Components/DeleteModal';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ContactInfoDisplay = ({ onBack, contact, onNavigateToEdit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, fetchCompanyContacts } = useCompany();

  // just temp for now, will replace with correct crud operations
 
  // dialogue control for delete option
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    setOpenDialog(true);
  };

  // --------------------Snackbar stuff and delete logic
  // ------------------- once done, for cleanliness lets see 
  // ------------------ if we can move it to a single file

  //snackbar stuff
  const [open, setOpen] = useState(false);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const openSnackBar = () => {
    setOpen(true);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  //----------------------------------------------

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/companies/${selectedCompany.id}/contacts/${contact.id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          // delete requests typically don't need a body
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      // Success! Open snackbar to notify user
      openSnackBar();
      
      // Refetch contacts to update the list
      await fetchCompanyContacts(selectedCompany.id);
      
      // Close dialog
      setOpenDialog(false);
      
      // Navigate back after small delay so the user sees the snackbar
      setTimeout(() => {
        onBack();
      }, 700);
    } catch (err) {
      setError(err.message);
      setOpenDialog(false);
    } finally {
      setLoading(false);
    }
  };

  const successMessage = "Contact deleted successfully!";

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
            Contact Information
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
              Name
            </Typography>
            <Typography
              color={colors.customAccent.light}
              variant="h4"
              fontWeight="500"
            >
              {contact.first_name} {contact.last_name}
            </Typography>
          </Box>

          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              Role
            </Typography>
            <Typography
              color={colors.grey[100]}
              variant="h4"
            >
              {contact.role}
            </Typography>
          </Box>

          <Box>
            <Typography
              color={colors.grey[300]}
              variant="h5"
              fontWeight="600"
              mb="8px"
            >
              Email
            </Typography>
            <Typography
              color={colors.grey[100]}
              variant="h5"
              sx={{ wordBreak: 'break-all' }}
            >
              {contact.email}
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
              {contact.notes || 'No notes available'}
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
            onClick={() => onNavigateToEdit(contact)}
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
            Edit Contact
          </Button>

          <Button
            onClick={handleDelete}
            variant="contained"
            disabled={loading}
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
            {loading ? 'Deleting...' : 'Delete Contact'}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>

      <DeleteModal 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        word="contact"
        // this is the weirdest thing, if this has a wrapper function it works
        // if it dosennt it wont even allow users to enter contacts info page what the heck
      />

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={successMessage}
        action={action}
      />
    </>
  );
};

export default ContactInfoDisplay;