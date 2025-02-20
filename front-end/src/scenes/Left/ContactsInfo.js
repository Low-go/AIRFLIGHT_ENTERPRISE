import { Box, Typography, Button, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { tokens } from '../../theme';
import { useCompany } from '../../contexts/CompanyContext';
import { useState } from 'react';
import DeleteModal from '../../Components/DeleteModal';

const ContactInfoDisplay = ({ onBack, contact, onNavigateToEdit }) => {
 const theme = useTheme();
 const colors = tokens(theme.palette.mode);

 // just temp for now, will replace with correct crud operations
 
 // dialogue control for delete option
 const [openDialog, setOpenDialog] = useState(false);

 const handleDelete = () => {
   setOpenDialog(true);
 };

 const handleConfirmDelete = () => {
   console.log('Delete confirmed for contact:', contact.id);
   onBack();
 };

 return (
   <>
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
         mb="20px"
       >
         <Typography
           color={colors.grey[100]}
           variant="h3"
           fontWeight="600"
         >
           Contact Information
         </Typography>
       </Box>

       {/* The following is the model fields displayed  */}
       <Box 
         display="flex" 
         flexDirection="column" 
         gap="20px"
         mb="30px"
       >
         <Box>
           <Typography
             color={colors.grey[300]}
             variant="h5"
             fontWeight="600"
             mb="8px"
           >
             Name
           </Typography>
           <Typography
             color={colors.customAccent.light}
             variant="h4"
             fontWeight="500"
           >
             {contact.first_name} {contact.last_name}
           </Typography>
         </Box>

         <Box>
           <Typography
             color={colors.grey[300]}
             variant="h5"
             fontWeight="600"
             mb="8px"
           >
             Role
           </Typography>
           <Typography
             color={colors.grey[100]}
             variant="h4"
           >
             {contact.role}
           </Typography>
         </Box>

         <Box>
           <Typography
             color={colors.grey[300]}
             variant="h5"
             fontWeight="600"
             mb="8px"
           >
             Email
           </Typography>
           <Typography
             color={colors.grey[100]}
             variant="h5"
             sx={{ wordBreak: 'break-all' }}
           >
             {contact.email}
           </Typography>
         </Box>

         <Box>
           <Typography
             color={colors.grey[300]}
             variant="h5"
             fontWeight="600"
             mb="8px"
           >
             Notes
           </Typography>
           <Typography
             color={colors.grey[100]}
             variant="h5"
             sx={{
               whiteSpace: 'pre-wrap',
               backgroundColor: colors.primary[500],
               p: "15px",
               borderRadius: "4px",
               minHeight: "100px"
             }}
           >
             {contact.notes || 'No notes available'}
           </Typography>
         </Box>
       </Box>

       <Box
         display="flex"
         justifyContent="center"
         gap="16px"
         mt="auto"
         p="15px"
         borderTop={`4px solid ${colors.grey.border}`}
       >
         {/* buttons start here */}
         <Button
           onClick={onBack}
           variant="contained"
           sx={{
             backgroundColor: colors.blueAccent[500],
             color: colors.grey[100],
             fontSize: "14px",
             fontWeight: "bold",
             padding: "10px 20px",
             '&:hover': {
               backgroundColor: colors.blueAccent[600],
             }
           }}
         >
           Back
         </Button>

         <Button
           onClick={() => onNavigateToEdit(contact)}
           variant="contained"
           sx={{
             backgroundColor: colors.blueAccent[500],
             color: colors.grey[100],
             fontSize: "14px",
             fontWeight: "bold",
             padding: "10px 20px",
             '&:hover': {
               backgroundColor: colors.blueAccent[600],
             }
           }}
         >
           Edit Contact
         </Button>

         <Button
           onClick={handleDelete}
           variant="contained"
           sx={{
             backgroundColor: colors.redAccent[500],
             color: colors.grey[100],
             fontSize: "14px",
             fontWeight: "bold",
             padding: "10px 20px",
             '&:hover': {
               backgroundColor: colors.redAccent[600],
             }
           }}
         >
           Delete Contact
         </Button>
       </Box>
     </Box>

    <DeleteModal 
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      onConfirm={handleConfirmDelete}
      word = "contact"
    />
   </>
 );
};

export default ContactInfoDisplay;