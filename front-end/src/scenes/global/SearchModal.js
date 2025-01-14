import React, { useState } from 'react';
import { Box, Modal, Typography, useTheme } from "@mui/material";
import ReactDOM from 'react-dom';
import { tokens } from '../../theme';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useSidebar } from '../../contexts/SidebarContext';
import SearchResultsList from '../../Components/SearchResultsList';


// basic modal test
const SearchModal = ({ open, onClose}) => {
  
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const { isCollapsed } = useSidebar();

   // gonna be used to move modal if sidebar open or not
   const sidebarWidth = isCollapsed ? 75 : 250;
   
   // Input variables
   const [input, setInput] = useState("");
   const [results, setResults] = useState([]);

  // TODO: Come back here and replace this for some .env variable for these api calls
  const fetchData = (value) => {
    fetch('http://127.0.0.1:8000/api/companies')
      .then((response) => response.json())
      .then(json => {
        const results = json.filter((company) => {
          const searchTerm = value.toLowerCase().trim();
          const companyName = company.company_name.toLowerCase();
          return value && company && company.company_name && companyName.includes(searchTerm);
        });
        setResults(results);
        console.log(results); // TODO remove print when done testing
      });
  };
   
   const handleChange = (value) => {
    setInput(value)
    fetchData(value)
   }

   const handleResultClick = () => {
    onClose();
   }

   const style = {
        position: 'absolute',
        top: '26%',
        left: isCollapsed ? '50%' : `calc(50% + ${sidebarWidth / 2}px)`,
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: colors.primary[400],
        color: colors.grey[100],
        boxShadow: 24,
        p: 4,
        borderRadius: 1.5,
        border: `2px solid ${colors.customAccent.main}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
   
   };

  return ReactDOM.createPortal(
    <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        sx={style}
        >
        <Box sx={{ border: "1px solid #ccc", 
          flex: 1, 
          borderRadius: "4px", 
          display: "flex",
          padding: "2px"}}>
          <InputBase sx={{ ml: 2, flex: 1 }} 
            placeholder="Search Company Names..."
            value = {input}
            onChange={(e) => handleChange(e.target.value)}
          />
          <IconButton type="button" sx={{ p: 1}}>
              <SearchIcon />
          </IconButton>
        </Box>

        {/* Search Results relative to modal position*/}
        {results.length > 0 && (
          <Box sx={{ position: 'relative', mt: 1 }}>
            <SearchResultsList results={results} onResultClick={handleResultClick}/>
          </Box>
        )}
    </Box>
    </Modal>,
    document.getElementById('modal-root')
  )
}

export default SearchModal
