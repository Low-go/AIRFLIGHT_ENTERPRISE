import { Box, Typography, Paper, useTheme } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { tokens } from "../theme";

const MenuCard = ({ icon: Icon, title, onClick }) => {
  const theme = useTheme(); // Hook should be called at the top of the component
  const colors = tokens(theme.palette.mode); // Now, colors are available for use in the component

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: colors.primary[400],
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,  // Makes the card flexible but still controlled by the parent Box
        width: '100%',  // Makes sure the card fills the container
        minHeight: 150,
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${colors.grey[800]}`,
        '&:hover': {
          transform: 'translateY(-4px)', // will move box up, colors and shadows appear on hover
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
          borderLeft: `4px solid ${colors.customAccent.main}`,
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '4px',
          bottom: 0,
          left: 0,
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0), transparent)',
          transition: 'all 0.3s ease',
        },
        '&:hover:after': {
          background: `linear-gradient(90deg, transparent, ${colors.customAccent.main}, transparent)`,
        }
      }}
      onClick={onClick}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        color={colors.grey[100]}
        position="relative"
        zIndex="1"
      >
        {/** Header */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
              borderRadius: '12px',
              p: 1.5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Icon sx={{ 
              fontSize: 32, 
              color: colors.customAccent.main,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1) rotate(5deg)',
              }
            }} />
          </Box>
          <Typography 
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              fontSize: '1.1rem',
              backgroundImage: `linear-gradient(45deg, ${colors.grey[100]}, ${colors.grey[300]})`,
              backgroundClip: 'text',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.primary[700]})`,
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              background: `linear-gradient(135deg, ${colors.customAccent.dark}, ${colors.customAccent.main})`,
            }
          }}
        >
          <KeyboardArrowRightIcon sx={{ 
            color: colors.grey[100],
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'translateX(2px)',
            }
          }} />
        </Box>
      </Box>
    </Paper>
  );
};

export default MenuCard;
