import {React, useState, useEffect} from 'react';
import { Box, useTheme, Button, Typography } from '@mui/material';
import { tokens } from '../../theme';
import { useCompany } from '../../contexts/CompanyContext';

const ContactsView = ({ onBack }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedCompany, companyContacts, fetchCompanyContacts } = useCompany();

  
  //sets loading to be tru and utilizes the global company id we have
  // saved and passes it into our global function for making api calls for contacts
  
  useEffect(() =>{
    const fetchData = async () => {
      if (selectedCompany){
        try{
          setLoading(true);
          await fetchCompanyContacts(selectedCompany.id);
        } catch (err){
          setError('Failed to fetch Company Contacts Information');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [selectedCompany, fetchCompanyContacts]);

  // replace with better look later
  if (loading) return <div>Loading Contacts..</div>
  if (error) return <div>Error: {error}</div>

  if (!companyContacts || companyContacts.length === 0)
      return (
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          flex = "1"
          p ="20px"
          borderRadius="5px"
        >
          No Contacts available.
        </Box>
      );

  return (
    <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        flex = "1"
        p ="20px"
        borderRadius= "8px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.customAccent.main}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography
          color={colors.grey[100]}
          variant="h5"
          fontWeight="600"
        >
          Contacts
        </Typography>
      </Box>

      {companyContacts.map((contact, i) => (
        <Box
          key={`${contact.id}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.grey.border}`}
          p="15px"
        >
          <Box>
            <Typography
              color={colors.customAccent.light}
              variant="h5"
              fontWeight="600"
            >
              {contact.first_name}
            </Typography>
            <Typography color={colors.grey[100]}>
              {contact.role}
            </Typography>
          
          </Box>

            <Button
              variant="contained"
                sx={{
                    backgroundColor: colors.greenAccent[500],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "5px 10px",
                  }}
                  >
                  Info
            </Button>
        </Box>  
      ))}

      {/* create Contact and back buttons */}
      <Box display="flex" justifyContent={"center"} p="15px">
        <Button
            onClick={onBack}
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              mr: 2,
            }}
        >
            BACK TO MAIN
        </Button>

        
        <Button
            // onClick={onCreateNew}
            variant="contained"
            sx={{
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "8px 16px",
            }}
            >
            New Contact
        </Button>
      </Box>
    </Box>
  );
}

export default ContactsView
