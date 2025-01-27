import { React, useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useCompany } from '../../contexts/CompanyContext';

const FleetView = ({ onBack, onCreateNew }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, companyFleets, fetchCompanyFleets } = useCompany();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //sets loading to be tru and utilizes the global company id we have
  // saved and passes it into our global function for making api calls for fleets
  useEffect(() => {
    const fetchData = async () => {
      if (selectedCompany) {
        try {
          setLoading(true);
          await fetchCompanyFleets(selectedCompany.id);
        } catch (err) {
          setError('Failed to fetch fleet information.')
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [selectedCompany, fetchCompanyFleets]);

  if (loading) return <div>Loading fleets..</div>
  if (error) return <div>Error: {error}</div>
  
  if (!companyFleets || companyFleets.length === 0)
    return (
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        display="flex"
        flex = "1"
        flexDirection="column"
        p="20px"
        borderRadius="5px"

      >
        <Typography color={colors.grey[100]}>
          No fleets available for this company.
        </Typography>

        <Box 
          display="flex" 
          justifyContent="center" 
          p="15px" 
          mt="auto"
          width="100%"    // Add this to ensure button container takes full width
        >
          <Button
            onClick={onBack}
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              mr: 2,
            }}
          >
            Back to Main
          </Button>
        </Box>
      </Box>
    )

  return (
   
    <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      overflow="auto"
      flex = "1"
      p ="20px"
      borderRadius= "5px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.customAccent.main}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography
          color={colors.grey[100]}
          variant="h5"
          fontWeight="600"
        >
          Fleets
        </Typography>
      </Box>
      
      {companyFleets.map((fleet, i) => (
        <Box
          key={`${fleet.id}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.grey.border}`}
          p="15px"
        >
          <Box>
            <Typography
              color={colors.customAccent.light}
              variant="h5"
              fontWeight="600"
            >
              {fleet.model}
            </Typography>
            <Typography color={colors.grey[100]}>
              ID: {fleet.id}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "5px 10px",
            }}
          >
            Info
          </Button>
        </Box>
      ))}
      
      <Box display="flex" justifyContent="center" p="15px">
        <Button
          onClick={onBack}
          variant="contained"
          sx={{
            backgroundColor: colors.greenAccent[500],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "8px 16px",
            mr: 2,
          }}
        >
          Back to Main
        </Button>

        {/* create fleet button */}
        <Button
          onClick={onCreateNew}
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "8px 16px",
          }}
        >
          New Fleet
        </Button>
      </Box>
    </Box>
  );
}

export default FleetView;