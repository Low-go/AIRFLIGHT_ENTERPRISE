import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from '@mui/icons-material/GitHub';

const Topbar = () => { 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const sxHoverStyles = {
    
    '&:hover':{
      outline: `2px solid ${colors.customAccent.main}`, 
    }
  }

  // handle modal popping up
  const searchBarClick = () => {
    console.log("Search bar clicked");
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>

      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        sx={sxHoverStyles}
        onClick={searchBarClick}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode} sx={sxHoverStyles}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton component="a" href="https://github.com/Low-go" target="_blank" rel="noopener noreferrer" sx={sxHoverStyles}>
          <GitHubIcon/>
        </IconButton>

        <IconButton sx={sxHoverStyles}>
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton sx={sxHoverStyles}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;


