// import { Box, useTheme, Typography } from "@mui/material";

// import React from 'react'

// const BigNode = ({name}) => {
//   return (
//     <Flex
//         alignItems={"center"}
//         borderRadius="8px"
//         bg="#e2e8f0"
//         border="2px solid #bbbdbf"
//         p={2}
//         gap={2}
//         width = "155px"
//     >
//         <Box>
//             name 
//         </Box>
//         <Flex grow="1">
//             <Box>
//                 <Text
//             </Box>
//         </Flex>
//     </Flex>
//   )
// }

// export default BigNode


import { Box, Typography } from "@mui/material";
import React from "react";

const BigNode = ({ data }) => {
  return (
    <Box
      borderRadius="8px"
      bgcolor="#e2e8f0"
      border="2px solid #bbbdbf"
      width="155px"
    >
      <Box
        padding={1.5}
        borderBottom="1px solid #bbbdbf"
      >
        <Typography variant="body1" fontWeight="bold">
          {data.name}
        </Typography>
      </Box>
      
      <Box 
        padding={1.5}
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Typography variant="body2" color="textSecondary">
          Additional Text
        </Typography>
      </Box>
    </Box>
  );
};

export default BigNode;

