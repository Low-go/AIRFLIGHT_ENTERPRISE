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
// maybe i should do a calander not sure yet

const Sidebar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false); // collapse sidebar or not
  const [selected, setSelected] = useState("Dashboard"); // which page we are at

  return (
    <div>
      Sidebar
    </div>
  )
}

export default Sidebar
