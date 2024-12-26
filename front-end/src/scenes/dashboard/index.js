import Header from "../../Components/Header";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";

const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to Airflight-Enterprise" />
      </Box>

      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="stretch" 
        height="65vh" // lets see if this height is ok
        mt="20px"
        gap="20px"
        
      >
        {/**Left Box */}
        <Box 
          flex="1" // Equal with using flex 1 for both containers
          bgcolor={colors.primary[400]}
          p="20px"
          borderRadius="4px"
          overflow="scroll" // left box should probably have this
        >
          <Typography variant="h6" color={colors.grey[100]}>
            Left Grid Content
          </Typography>
        </Box>

         {/**Right Box */}
        <Box 
          flex="1" 
          bgcolor={colors.primary[400]}
          p="20px"
          borderRadius="4px"
        >
          <Typography variant="h6" color={colors.grey[100]}>
            Right Grid Content
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
