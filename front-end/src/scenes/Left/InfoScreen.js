import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const InfoScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        borderBottom={`4px solid ${colors.primary[500]}`}
        color={colors.grey[100]}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Info Screen
        </Typography>
      </Box>

      {/* Placeholder for transaction list */}
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={colors.grey[100]}
      >
        <Typography variant="h6" color={colors.grey[100]}>
          No transactions to display
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoScreen;
