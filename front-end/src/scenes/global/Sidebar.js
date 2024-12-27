import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import  HomeOutlinedIcon  from "@mui/icons-material/HomeOutlined";
import  FeedOutlinedIcon  from "@mui/icons-material/FeedOutlined";
import  HubOutlinedIcon  from "@mui/icons-material/HubOutlined";
import  QuizOutlinedIcon  from "@mui/icons-material/QuizOutlined";
import MenuOutlinedIcon  from "@mui/icons-material/MenuOutlined";
import PublicIcon from '@mui/icons-material/Public';
// maybe i should do a calander not sure yet

const Item = ({ title, to, icon, selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return ( // so we do not have to repeat for each menu item
    <MenuItem 
      active={selected === title} 
      style={{color : colors.grey[100]}} 
      onClick={(() => setSelected(title))} 
      icon={icon}>

      <Typography>{title}</Typography>
      <Link to={to}/>
    </MenuItem>
  )
}

const Sidebar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false); // collapse sidebar or not
  const [selected, setSelected] = useState("Dashboard"); // which page we are at

  // main compliment color to be used
  const sxHoverStyles = { // need to come back to this, its being cut out
    '&:hover':{
      outline: `2px solid ${colors.customAccent.main}`, 
    },
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.customAccent.light} !important`, // need a slight variation to replace you
        },
        "& .pro-menu-item.active": {
          color: `${colors.customAccent.main} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square" >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  AIRFLIGHT-ENTERPRISE
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} sx={sxHoverStyles}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/**More menu item type stuff */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item 
              title ="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              colors = {colors.grey[300]}
              sx={{m : "15px 0 5px 20px"}}
            > Info </Typography>

            <Item 
              title ="Nodes"
              to="/nodes"
              icon={<HubOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item 
              title ="Reports"
              to="/reports"
              icon={<FeedOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item 
              title ="Geography"
              to="/geography"
              icon={<PublicIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              colors = {colors.grey[300]}
              sx={{m : "15px 0 5px 20px"}}
            > Help </Typography>

            <Item 
              title ="FAQ"
              to="/faq"
              icon={<QuizOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
