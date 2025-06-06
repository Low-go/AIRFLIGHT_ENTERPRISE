import { React, useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme, Skeleton } from "@mui/material";
import { tokens } from "../../theme";
import { useCompany } from '../../contexts/CompanyContext';

const PartsView = ({ onBack, onCreateNew, onNavigateToPartInfo, fleetId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, fleetPartsMap, fetchFleetParts } = useCompany();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fleetParts = fleetPartsMap[fleetId] || [];

  //sets loading to be true and utilizes the global company id and fleet id
  // saved and passes it into our global function for making api calls for parts
  useEffect(() => {
    const fetchData = async () => {
      if (selectedCompany && fleetId) {

        console.log("About to fetch parts data for:", { 
          companyId: selectedCompany.id, 
          fleetId 
        });

        try {
          setLoading(true);
          await fetchFleetParts(selectedCompany.id, fleetId);
        } catch (err) {
          setError('Failed to fetch part information.')
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [selectedCompany, fleetId, fetchFleetParts]);

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
            Loading Parts...
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
          Back to Fleet
        </Button>
      </Box>
  );
  
  if (!fleetParts || fleetParts.length === 0)
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
          No Parts.
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
            Back to Fleet
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
            New Part
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
          Parts
        </Typography>
      </Box>
      
      {fleetParts.map((part, i) => (
        <Box
          key={`${part.id}-${i}`}
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
              {part.name}
            </Typography>
            <Typography color={colors.grey[100]}>
              ID: {part.id}
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
            onClick={() => {console.log(part); onNavigateToPartInfo(part)}} //  Me attempting to pass the part object as prop 

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
          BACK TO FLEET
        </Button>

        {/* create part button */}
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
          New Part
        </Button>
      </Box>
    </Box>
  );
}

export default PartsView;

// TODO change button colors in light mode