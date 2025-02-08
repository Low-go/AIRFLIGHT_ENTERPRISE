import { useState, useEffect } from 'react';
import React from 'react';
import { Box, Button, TextField, Typography, useTheme, Snackbar } from "@mui/material";
import { tokens } from "../../theme";
import { useCompany } from '../../contexts/CompanyContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const FleetForm = ({ onBack, mode="edit", fleetData = "" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, fetchCompanyFleets } = useCompany();
  
  const [formData, setFormData] = useState({
    model: '',
    fabrication_date: '',
    notes: ''
  });


    // If in edit mode and fleetData is provided, set initial form data
    useEffect(() => {
      if (mode === "edit" && fleetData) {
        setFormData({
          model: fleetData.model,
          fabrication_date: fleetData.fabrication_date,
          notes: fleetData.notes || ''
        });
      }
    }, [mode, fleetData]);

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

  // Handles either the creation or update of an entity
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // This will atke care of determining which crud operation we perform
    const isEdit = mode === 'edit';
    const method = isEdit ? 'PUT' : 'POST'

    try { // TODO most likely replace this api call in the future
      const response = await fetch(
        `http://127.0.0.1:8000/api/companies/${selectedCompany.id}/fleets/${isEdit ? fleetData.id : ''}`, // only attatch the id of the specific fleet if its in edit mode
        {
          method,
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
        throw new Error(`Failed to ${isEdit ? 'update' : 'create'} fleet`);
      }

      // Success! Navigate back
      openSnackBar();


      // if it was successful we refetch fleet data so that its updated
      await fetchCompanyFleets(selectedCompany.id)

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

  // Dynamic text based on mode
  const formTitle = mode === "edit" ? "Edit Fleet" : "Create New Fleet";
  const submitButtonText = mode === "edit" 
    ? (loading ? 'Saving...' : 'Save Changes')
    : (loading ? 'Creating...' : 'Create Fleet');
  const successMessage = mode === "edit" 
    ? "Fleet updated successfully!"
    : "Fleet created successfully!";

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
            label="Model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
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
            type="date"
            label="Fabrication Date"
            value={formData.fabrication_date}
            onChange={(e) => setFormData({ ...formData, fabrication_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
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
              // this here checks if the required Fleet modal data has been inputed
              disabled={loading || !formData.model}
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

export default FleetForm;