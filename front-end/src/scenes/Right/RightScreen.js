import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../theme';
import { ReactFlow, useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, StraightEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BigNode from './Nodes/BigNode';
import SmallNode from './Nodes/Small.Node';
import MediumNode from './Nodes/MediumNode';
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import { useCompany } from '../../contexts/CompanyContext';

const RightScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDarkMode = theme.palette.mode === "dark";
  const { selectedCompany } = useCompany();
  
  // Memoize nodeTypes, no rerenders allowed if nothings changed
  const nodeTypes = useMemo(() => ({
    bigNode: (props) => <BigNode 
      {...props} 
      isDarkMode={isDarkMode}
      onHandleClick={(nodeId, handleId) => handleNodeButtonClick(nodeId, handleId)}
      />,
    smallNode: (props) => <SmallNode {...props} isDarkMode={isDarkMode}/>,
    mediumNode: (props) => <MediumNode {...props} isDarkMode={isDarkMode}/>
  }), [isDarkMode]);


  //---------this will be the magic for retraction, I might pull it out of this file later --------------------

  // this will be my attempt at handling node retractions and creations
  const handleNodeButtonClick = (nodeId, handleId) => {
    console.log(`Node ${nodeId} handle ${handleId} clicked`);

    // lets give this bad boy a shot ahhhhhhhh


    const contactsNodeId = `${nodeId}-contacts`;
    const fleetsNodeId = `${nodeId}-fleets`;

    // this is if we already have these existing nodes in out system
    if (handleId === 'top-right-handle'){ // the contacts button
      
      const existingNodeIndex = nodes.findIndex(node => node.id === contactsNodeId);
      
      if (existingNodeIndex >= 0){

        // we remove it in this case, its beeing clicked again
        setNodes(nodes => nodes.filter(node => node.id !== contactsNodeId ));
        setEdges(edges => edges.filter(edge => edge.source !== nodeId || edge.target !== contactsNodeId));
      }

      else{
        // node does not exist we create it
      }
    }
  }


  //------------End of code retraction stuff -----------------
  
  // Initialize states with empty arrays
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // Set up nodes and edges when selectedCompany changes
  useEffect(() => {
    if (selectedCompany) {
      console.log("Selected company updated:", selectedCompany.company_name);
      
      const initialNodes = [
        {
          id: '1',
          type: 'bigNode',
          position: { x: 100, y: 100 },
          data: {
            name: selectedCompany.company_name,
            colors: colors,
          },
        },
        {
          id: '2',
          type: 'smallNode',
          position: { x: 400, y: 50 },
          data: {
            name: 'Small Node',
            colors: colors,
          }
        },

        //this will be to test main node types
        {
          id:'3',
          type: 'mediumNode',
          position: {x: 600, y: 100},
          data: {
            name: 'Medium Node',
            colors: colors,
          }
        }
      ];
      
      const initialEdges = [ 
        { 
          id: 'e1-2', 
          source: '1', 
          target: '2',
          animated: true,
          sourceHandle: 'top-right-handle',
          targetHandle: 'left-handle',
          style: { 
            stroke: isDarkMode ? "#ffffff" : "#000000", 
            strokeWidth: 2
          }
        },
        {
          id: 'e2-3',
          source: '2',
          target: '3',
          animated: true,
          sourceHandle: 'right-handle',
          targetHandle: 'medium-handle',
          style: { 
            stroke: isDarkMode ? "#ffffff" : "#000000", 
            strokeWidth: 2
          }
        } 
      ];
      
      setNodes(initialNodes);
      setEdges(initialEdges);
    } else {
      // Clears nodes and edges if no company is selected
      setNodes([]);
      setEdges([]);
    }
  }, [selectedCompany, isDarkMode]); 
  
  // Memoize the connect callback, so no rerenders
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        style: { 
          stroke: isDarkMode ? "#ffffff" : "#000000", 
          strokeWidth: 2
        },
        animated: true
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, isDarkMode]
  );
  
  // Edge style update effect ->>> only needed if isDarkMode changes after edges exist
  useEffect(() => {
    if (edges.length > 0) {
      setEdges(edges => 
        edges.map(edge => ({
          ...edge,
          style: { 
            stroke: isDarkMode ? "#ffffff" : "#000000", 
            strokeWidth: 2
          }
        }))
      );
    }
  }, [isDarkMode, setEdges]);
  
  // Placeholder if no company selected
  if (!selectedCompany) {
    return (
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        flex="1"
        p="20px"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        <HubOutlinedIcon sx={{ 
          fontSize: 48, 
          color: colors.grey[500],
          animation: 'pulse 2s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': { opacity: 0.6 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.6 }
          }
        }} />
        <Typography 
          variant="h6" 
          color={colors.grey[100]} 
          textAlign="center"
          sx={{ fontWeight: 500 }}
        >
          Please select a company to see Node Tree
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      flex="1"
      bgcolor={colors.primary[400]}
      p="20px"
      borderRadius="4px"
      
    >
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls/>
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </Box>
  );
};

export default RightScreen;