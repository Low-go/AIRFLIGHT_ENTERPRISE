import { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useCompany } from '../../contexts/CompanyContext';

const CreateFleetView = ({ onBack }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany } = useCompany();
  
  const [formData, setFormData] = useState({
    model: '',
    fabrication_date: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try { // TODO most likely replace this api call in the future
      const response = await fetch(
        `http://127.0.0.1:8000/api/companies/${selectedCompany.id}/fleets/`,
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
        throw new Error('Failed to create fleet');
      }

      // Success! Navigate back
      onBack();
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
          Create New Fleet
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
              disabled={loading || !formData.model}
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "8px 16px",
              }}
            >
              {loading ? 'Creating...' : 'Create Fleet'}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreateFleetView;