import { Box, Typography, Button, useTheme } from "@mui/material";
import { useCompany } from "../../contexts/CompanyContext";
import { tokens } from "../../theme";

const MainView = ({ onNavigateToFleet }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedCompany, companyContacts, fetchCompanyContacts } = useCompany();

  // if no company is selected blank slate displayed
  if (!selectedCompany) {
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
        <Typography variant="h6" color={colors.grey[100]}>
          Please select a company to view information.
        </Typography>
      </Box>
    );
  }

  // when a company is selected/field full we display both options
  // and buttons
  return (
    <Box
      flex="1"
      bgcolor={colors.primary[400]}
      p="20px"
      borderRadius="4px"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.customAccent.main}`}
        color={colors.grey[100]}
        p="8px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          {selectedCompany.company_name}
        </Typography>
      </Box>

      {/* Contacts and Fleet Buttons */}
      <Box display="flex" justifyContent="space-between" mt="20px">
        <Button
          variant="contained"
          onClick={() => fetchCompanyContacts(selectedCompany.id)}
          sx={{ backgroundColor: colors.customAccent.main }}
        >
          Load Contacts
        </Button>
        <Button
          variant="contained"
          onClick={onNavigateToFleet}
          sx={{ backgroundColor: colors.customAccent.main }}
        >
          Load Fleets
        </Button>
      </Box>

      {/* Contacts Information */}
      <Box mt="20px">
        <Typography variant="h6" color={colors.grey[100]}>
          Contacts:
        </Typography>
        {companyContacts ? (
          companyContacts.map((contact, index) => (
            <Typography key={index} variant="body1" color={colors.grey[100]}>
              {contact.name} - {contact.phone}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color={colors.grey[100]}>
            No contacts loaded.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MainView;
