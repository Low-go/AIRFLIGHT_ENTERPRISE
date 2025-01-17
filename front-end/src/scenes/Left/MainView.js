import { Box, Typography, Button, Paper, Fade, IconButton, useTheme } from "@mui/material";
import { useCompany } from "../../contexts/CompanyContext";
import { tokens } from "../../theme";
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const MainView = ({ onNavigateToFleet }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, companyContacts, fetchCompanyContacts } = useCompany();

  const MenuCard = ({ icon: Icon, title, onClick, delay }) => (
    <Fade 
      in={true} 
      timeout={800} // Increased initial fade-in animation
      style={{ transitionDelay: delay }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          bgcolor: colors.primary[400],
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'transform 2s ease-in-out, box-shadow 2s ease-in-out', // Increased both transitions to 2 seconds
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
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
          <Box display="flex" alignItems="center" gap={2}>
            <Icon sx={{ fontSize: 28, color: colors.customAccent.main }} />
            <Typography variant="h6">{title}</Typography>
          </Box>
          <KeyboardArrowRightIcon />
        </Box>
      </Paper>
    </Fade>
  );

  // If no company has been selected or is saved as a global variable
  // then this more empty box appears
  if (!selectedCompany) {
    return (
      <Box
        flex="1"
        bgcolor={colors.primary[400]}
        p={4}
        borderRadius="4px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        <BusinessIcon sx={{ fontSize: 48, color: colors.grey[500] }} />
        <Typography variant="h6" color={colors.grey[100]} textAlign="center">
          Please select a company to view information
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      flex="1"
      bgcolor={colors.primary[400]}
      p={3}
      borderRadius="4px"
      display="flex"
      flexDirection="column"
      gap={3}
    >
      {/* Header */}
      <Fade in={true}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.customAccent.main}`}
          pb={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <BusinessIcon sx={{ color: colors.customAccent.main, fontSize: 32 }} />
            <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
              {selectedCompany.company_name}
            </Typography>
          </Box>
        </Box>
      </Fade>

      {/* Navigation Cards */}
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        mt={2}
      >
        <MenuCard
          icon={ContactsIcon}
          title="Company Contacts"
          onClick={() => fetchCompanyContacts(selectedCompany.id)}
          delay="100ms"
        />
        <MenuCard
          icon={DirectionsBoatIcon}
          title="Fleet Management"
          onClick={onNavigateToFleet}
          delay="200ms"
        />
      </Box>
    </Box>
  );
};

export default MainView;