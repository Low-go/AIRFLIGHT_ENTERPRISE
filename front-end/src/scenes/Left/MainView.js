import { Box, Typography, Paper, Fade, useTheme } from "@mui/material";
import { useCompany } from "../../contexts/CompanyContext";
import { tokens } from "../../theme";
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const MainView = ({ onNavigateToFleet, onNavigateToContacts }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, fetchCompanyContacts } = useCompany();

  const MenuCard = ({ icon: Icon, title, onClick }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: colors.primary[400],
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,  // Makes the card flexible but still controlled by the parent Box
        width: '100%',  // Makes sure the card fills the container
        minHeight: 150,
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        },
      }}
      onClick={onClick}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        color={colors.grey[100]}
      >

        {/** Header */}
        <Box display="flex" alignItems="center" gap={2}>
          <Icon sx={{ 
            fontSize: 28, 
            color: colors.customAccent.main,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }} />
          <Typography 
            variant="h6"
            sx={{
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}
          >
            {title}
          </Typography>
        </Box>
        <KeyboardArrowRightIcon sx={{ 
          color: colors.grey[300],
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'translateX(4px)',
          }
        }} />
      </Box>
    </Paper>
  );

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
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.customAccent.main}`}
        p="15px"
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
        gap={2}
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
