import { Box, Typography, useTheme } from "@mui/material";
import { useCompany } from "../../contexts/CompanyContext";
import { tokens } from "../../theme";
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import MenuCard from "../../Components/MenuCard";


const MainView = ({ onNavigateToFleet, onNavigateToContacts }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, fetchCompanyContacts } = useCompany();

  // If no company has been selected or is saved as a global variable
  if (!selectedCompany) {
    return (
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        flex="1"
        p="20px"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        <BusinessIcon sx={{ 
          fontSize: 48, 
          color: colors.grey[500],
          animation: 'pulse 2s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': { opacity: 0.6 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.6 }
          }
        }} />
        <Typography 
          variant="h6" 
          color={colors.grey[100]} 
          textAlign="center"
          sx={{ fontWeight: 500 }}
        >
          Please select a company to view information
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      overflow="auto"
      flex="1"
      p="20px"
      borderRadius="8px"
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
        p="15px"
        mb={3}
        sx={{
          background: `linear-gradient(90deg, ${colors.primary[500]}, ${colors.primary[400]})`,
          borderRadius: '8px 8px 0 0',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <BusinessIcon sx={{ 
            color: colors.customAccent.main, 
            fontSize: 36,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }} />
          <Typography 
            color={colors.grey[100]} 
            variant="h4" 
            sx={{
              fontWeight: 600,
              letterSpacing: '0.5px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            {selectedCompany.company_name}
          </Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={3}  // increased gap for better spacing
        mt={2}
        flex="1"
        alignItems="stretch"  
      >
        <MenuCard
          icon={ContactsIcon}
          title="Company Contacts"
          onClick={onNavigateToContacts}
        />
        <MenuCard
          icon={AirplanemodeActiveIcon}
          title="Fleet Management"
          onClick={onNavigateToFleet}
        />
      </Box>
    </Box>
  );
};

export default MainView;