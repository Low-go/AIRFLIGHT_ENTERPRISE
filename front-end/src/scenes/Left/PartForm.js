import { useState, useEffect } from 'react';
import React from 'react';
import { Box, Button, TextField, Typography, useTheme, Snackbar, InputAdornment } from "@mui/material";
import { tokens } from "../../theme";
import { useCompany } from '../../contexts/CompanyContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const PartForm = ({ onBack, mode="edit", partData = "", fleetId }) => {
  console.log("fleetid is : ", fleetId)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, fetchCompanyFleets } = useCompany();
  
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    part_number_identifier: '',
    expected_lifespan: '',
    manufacturer: '',
    price: '',
    notes: ''
  });

  // If in edit mode and partData is provided, set initial form data
  useEffect(() => {
    if (mode === "edit" && partData) {
      setFormData({
        name: partData.name || '',
        model: partData.model || '',
        part_number_identifier: partData.part_number_identifier || '',
        expected_lifespan: partData.expected_lifespan || '',
        manufacturer: partData.manufacturer || '',
        price: partData.price || '',
        notes: partData.notes || ''
      });
    }
  }, [mode, partData]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Snackbar state and handlers
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Open snackbar when request is successful
  const openSnackBar = () => {
    setOpen(true);
  };

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

  // Handles either the creation or update of a part
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Determine which CRUD operation to perform
    const isEdit = mode === 'edit';
    const method = isEdit ? 'PUT' : 'POST';
    
    const companyId = selectedCompany.id;


    console.log('Request payload:', {
      ...formData,
      fleet: fleetId
    });
    
    try {

 
      const response = await fetch(
        `http://127.0.0.1:8000/api/companies/${companyId}/fleets/${fleetId}/parts/${isEdit ? partData.id + '/' : ''}`,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            fleet: fleetId
          }),
        }
      );


      // Add these lines to debug the response
      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      console.log('Response body:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to ${isEdit ? 'update' : 'create'} part`);
      }

      // Success! Show notification
      openSnackBar();

      // Refresh fleet data to include updated parts
      await fetchCompanyFleets(selectedCompany.id);

      // Navigate back after a short delay
      setTimeout(() => {
        onBack();
      }, 700);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic text based on mode
  const formTitle = mode === "edit" ? "Edit Part" : "Add New Part";
  const submitButtonText = mode === "edit" 
    ? (loading ? 'Saving...' : 'Save Changes')
    : (loading ? 'Creating...' : 'Add Part');
  const successMessage = mode === "edit" 
    ? "Part updated successfully!"
    : "Part added successfully!";

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
          {formTitle}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="20px">
          <TextField
            required
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] }
              }
            }}
          />

          <TextField
            required
            label="Model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] }
              }
            }}
          />

          <TextField
            label="Part Number/Identifier"
            value={formData.part_number_identifier}
            onChange={(e) => setFormData({ ...formData, part_number_identifier: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] }
              }
            }}
          />

          <TextField
            label="Expected Lifespan (in days)"
            type="number"
            value={formData.expected_lifespan}
            onChange={(e) => setFormData({ ...formData, expected_lifespan: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] }
              }
            }}
          />

          <TextField
            label="Manufacturer"
            value={formData.manufacturer}
            onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] }
              }
            }}
          />

          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{
              '& label': { color: colors.grey[100] }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.grey[100] },
                '&:hover fieldset': { borderColor: colors.customAccent.light }, 
                '& input': { color: colors.grey[100] },
                '& .MuiInputAdornment-root': { color: colors.grey[100] }
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
              // Disable if required fields are missing
              disabled={loading || !formData.name || !formData.model}
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "8px 16px",
              }}
            >
              {submitButtonText}
            </Button>
          </Box>
        </Box>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={successMessage}
        action={action}
      />
    </Box>
  );
};

export default PartForm;