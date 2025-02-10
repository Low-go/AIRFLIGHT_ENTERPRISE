import { Box, Typography, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { useCompany } from '../../contexts/CompanyContext';

const FleetInfoDisplay = ({ onBack, fleet, onNavigateToEdit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // just temp for now, will replace with correct crud operations

  const handleDelete = () => {
    console.log('Delete clicked for fleet:', fleet.id);
  };

  return (
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
          Delete Contact
        </Button>
      </Box>
    </Box>
  );
};

export default FleetInfoDisplay;