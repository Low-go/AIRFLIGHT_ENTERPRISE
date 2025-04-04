import { React, useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme, Skeleton } from "@mui/material";
import { tokens } from "../../theme";
import { useCompany } from '../../contexts/CompanyContext';

const FleetView = ({ onBack, onCreateNew, onNavigateToFleetInfo }) => {
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

  // Quick change to display a proper box while loading, can be changed later
  if (loading) return (
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
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100%"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Loading Contacts...
          </Typography>
        </Box>
      </Box>
  );

  // change this also
   if (error) return (
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        flex="1"
        p="20px"
        borderRadius="8px"
      >
        <Typography color={colors.grey[100]} variant="h5">
          Error: {error}
        </Typography>
        <Button
          onClick={onBack}
          variant="contained"
          sx={{
            backgroundColor: colors.customAccent.main,
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "8px 16px",
            mt: 2,
            '&:hover': {
              backgroundColor: colors.customAccent.dark,
            }
          }}
        >
          Back to Main
        </Button>
      </Box>
  );
  
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
        borderRadius="8px"
        sx={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${colors.grey[800]}`,
        }}
      >
        <Typography color={colors.grey[100]}>
          No Fleets.
        </Typography>

        <Box 
          display="flex" 
          justifyContent="center" 
          p="15px" 
          mt="auto"
          width="100%"    
        >
          <Button
            onClick={onBack}
            variant="contained"
            sx={{
              backgroundColor: colors.customAccent.main,
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              mr: 2,
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: colors.customAccent.dark,
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }
            }}
          >
            Back to Main
          </Button>

          <Button
            onClick={onCreateNew}
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[600],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: colors.blueAccent[700],
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }
            }}
          >
            New Fleet
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
        borderRadius= "8px"
        sx={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${colors.grey[800]}`,
        }}
    >

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.customAccent.main}`}
        colors={colors.grey[100]}
        p="15px"
        sx={{
          background: `linear-gradient(90deg, ${colors.primary[500]}, ${colors.primary[400]})`,
          borderRadius: '8px 8px 0 0',
        }}
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
          sx={{
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? colors.primary[500] 
                : 'rgba(240, 240, 250, 0.6)',  
              transform: 'translateX(4px)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              borderRadius: '4px',
              borderLeft: `2px solid ${colors.customAccent.main}`
            }
          }}
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
              backgroundColor: colors.customAccent.main,
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "5px 10px",
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: colors.customAccent.dark,
                transform: 'translateY(-2px)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              }
            }}
            onClick={() => onNavigateToFleetInfo(fleet)} //  Me attempting to pass the company object as prop 
          >
            Info
          </Button>
        </Box>  
      ))}
      
      <Box display="flex" justifyContent={"center"} p="15px">
        <Button
          onClick={onBack}
          variant="contained"
          sx={{
            backgroundColor: colors.customAccent.main,
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "8px 16px",
            mr: 2,
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: colors.customAccent.dark,
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }
          }}
        >
          BACK TO MAIN
        </Button>

        {/* create fleet button */}
        <Button
          onClick={onCreateNew}
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[600],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "8px 16px",
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: colors.blueAccent[700],
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }
          }}
        >
          New Fleet
        </Button>
      </Box>
    </Box>
  );
}

export default FleetView;

// TODO change button colors in light mode