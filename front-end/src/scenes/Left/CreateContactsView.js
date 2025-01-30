import { useState } from 'react';
import React from 'react';
import { Box, Button, TextField, Typography, useTheme, Snackbar } from "@mui/material";
import { tokens } from "../../theme";
import { useCompany } from '../../contexts/CompanyContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CreateContactView = ({ onBack }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, fetchCompanyContacts } = useCompany();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // The following section is variables for the Snackbar and its function
  // ------------------------------------------------
  const[open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // this should be called in handlesubmit to open the snackbar/toast when request is sucessful 
  const openSnackBar = () => {
    setOpen(true);
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try { // TODO most likely replace this api call in the future
      const response = await fetch(
        `http://127.0.0.1:8000/api/companies/${selectedCompany.id}/contacts/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            company: selectedCompany.id
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create contact');
      }

      // Success! Navigate back
      openSnackBar();

      // if it was successful we refetch contact data so that its updated
      await fetchCompanyContacts(selectedCompany.id)

      setTimeout(() => {
        onBack();
      }, 700);
      // onBack();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      overflow="auto"
      flex="1"
      p="20px"
      borderRadius="5px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.customAccent.main}`}
        colors={colors.grey[100]}
        p="15px"
        mb="20px"
      >
        <Typography
          color={colors.grey[100]}
          variant="h5"
          fontWeight="600"
        >
          Create New Contact
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="20px">
          <TextField
            required
            label="First Name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] } // TODO Repolace this color most likely
              }
            }}
          />

          <TextField
            required
            label="Last Name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] } // TODO Repolace this color most likely
              }
            }}
          />

          <TextField
            required
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] } // TODO Repolace this color most likely
              }
            }}
          />

          <TextField
            required
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] } // TODO Repolace this color most likely
              }
            }}
          />

          <TextField
            label="Notes"
            multiline
            rows={4}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light },
                '& textarea': { color: colors.grey[100] }
              }
            }}
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* two buttons displayed here */}
          <Box display="flex" justifyContent="center" gap="16px" mt="20px">
            <Button
              onClick={onBack}
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[500],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "8px 16px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              // this here checks if the required Contact modal data has been inputed
              disabled={loading || !formData.first_name || !formData.last_name || !formData.role || !formData.email}
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "8px 16px",
              }}
            >
              {loading ? 'Creating...' : 'Create Contact'}
            </Button>
          </Box>
        </Box>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Contact created successfully!"
        action={action}
      />
    </Box>
  );
};

export default CreateContactView;