import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const InfoScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      flex="1"
      sx={{
        backgroundColor: colors.primary[400],
        borderRadius: "8px",
        boxShadow: theme.palette.mode === "dark" 
          ? "0 4px 6px rgba(0, 0, 0, 0.6)" 
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Border Gradient */}
      <Box
        sx={{
          height: "4px",
          background: `linear-gradient(90deg, ${colors.customAccent.main}, transparent)`,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          padding: "16px",
          borderBottom: `1px solid ${colors.primary[500]}`,
          backgroundColor: theme.palette.mode === "dark" 
            ? colors.primary[600] 
            : colors.primary[300],
        }}
      >
        <Typography
          variant="h6"
          color={colors.grey[100]}
          fontWeight="600"
        >
          Information Panel
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          padding: "16px",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: colors.primary[500],
          },
          "&::-webkit-scrollbar-thumb": {
            background: colors.customAccent.main,
            borderRadius: "3px",
          },
        }}
      >
        <Typography color={colors.grey[100]}>
          This panel will display detailed, scrollable, and collapsible information. Add components dynamically here.
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoScreen;
