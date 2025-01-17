import {React, useEffect, useState} from 'react';
import { Box, Typography, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useCompany } from '../../contexts/CompanyContext';

const FleetView = ({ onBack}) => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, companyFleets, fetchCompanyFleets } = useCompany();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // so a useEffect is used when managing side effects?
  useEffect(() =>{
    const fetchData = async () => {
      if (selectedCompany){ // if company has been selected/data is loaded
        try{
          setLoading(true);
          await fetchCompanyFleets(selectedCompany.id);
        }
        catch(err){
          setError('Failed to fetch fleet information.')
        }
        finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [selectedCompany, fetchCompanyFleets]);

  // temp ugly loading for now
  if (loading) return <div>Loading fleets..</div>
  if (error) return <div>Error: {error}</div>

  // I don't remember if they all have fleets yet
  if (!companyFleets || companyFleets.length === 0)
    return <div>No fleets available for this company.</div>;

  return (
    <Box
        flex="1"
        bgcolor={colors.primary[400]}
        p="20px"
        borderRadius="4px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      alignItems="center"
    >
      {companyFleets.map((fleet) => (
        <div key={fleet.id}>{fleet.model}</div>
      ))}
      <Button
        onClick={onBack}
      >
        Back to Main
      </Button>
    </Box>
  )
}

export default FleetView
