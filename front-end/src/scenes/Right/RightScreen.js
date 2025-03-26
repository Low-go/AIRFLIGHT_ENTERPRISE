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


  //---------this will be the magic for retraction, I might pull it out of this file later ----------------------------------------------------

  // this will be my attempt at handling node retractions and creations
  const handleNodeButtonClick = (nodeId, handleId) => {
    setNodes((currentNodes) => {

      // lets give this bad boy a shot ahhhhhhhh
      
      // instead of checking by array index number or id lets just assign an id or name. i don't know how practical this is
      const existingContactsNodeIndex = currentNodes.findIndex(
        node => node.data.name === 'Contacts'
      );
      const existingFleetsNodeIndex = currentNodes.findIndex(
        node => node.data.name === 'Fleets'
      );

      const contactsNodeId = `${nodeId}-contacts`;
      const fleetsNodeId = `${nodeId}-fleets`;
  
      // this is if we already have these existing nodes in out system
      if (handleId === 'top-right-handle') {

        //const existingNodeIndex = nodes.findIndex(node => node.id === contactsNodeId);
        // If no contacts node exists, create one
        if (existingContactsNodeIndex === -1) {
          const contactsNodeId = `contacts-${Date.now()}`;
          const contactsNode = {
            id: contactsNodeId,
            type: 'smallNode',
            position: { 
              x: currentNodes[0].position.x + 250, 
              y: currentNodes[0].position.y - 150 
            },
            data: {
              name: 'Contacts',
            },
          };
  
          // Create a new edge connecting the original node to the contacts node
          const newEdge = {
            id: `e${nodeId}-${contactsNodeId}`,
            source: nodeId,
            target: contactsNodeId,
            sourceHandle: 'top-right-handle',
            targetHandle: 'left-handle',
            animated: true,
            style: { 
              stroke: isDarkMode ? "#ffffff" : "#000000", 
              strokeWidth: 2
            }
          };
  
          // Update both nodes and edges
          setEdges(edges => [...edges, newEdge]);
          return [...currentNodes, contactsNode];
        } 
        // If contacts node exists, remove it
        else {
          // Remove edges
          setEdges(edges => 
            edges.filter(edge => 
              edge.source !== currentNodes[existingContactsNodeIndex].id && 
              edge.target !== currentNodes[existingContactsNodeIndex].id
            )
          );
          return currentNodes.filter(node => node.data.name !== 'Contacts');
        }
      }
      
      // If bottom-right handle is clicked (for Fleets)
      if (handleId === 'bottom-right-handle') {
        // If no fleets node exists, create one
        if (existingFleetsNodeIndex === -1) {
         
          const fleetsNode = {
            id: fleetsNodeId,
            type: 'smallNode',
            position: { 
              x: currentNodes[0].position.x + 250, 
              y: currentNodes[0].position.y + 150 
            },
            data: {
              name: 'Fleets',
            },
          };
  
          // Create a new edge connecting the original node to the fleets node
          const newEdge = {
            id: `e${nodeId}-${fleetsNodeId}`,
            source: nodeId,
            target: fleetsNodeId,
            sourceHandle: 'bottom-right-handle',
            targetHandle: 'left-handle',
            animated: true,
            style: { 
              stroke: isDarkMode ? "#ffffff" : "#000000", 
              strokeWidth: 2
            }
          };
  
          // Update both nodes and edges
          setEdges(edges => [...edges, newEdge]);
          return [...currentNodes, fleetsNode];
        } 
        // If fleets node exists, remove it
        else {
          // Remove edges
          setEdges(edges => 
            edges.filter(edge => 
              edge.source !== currentNodes[existingFleetsNodeIndex].id && 
              edge.target !== currentNodes[existingFleetsNodeIndex].id
            )
          );
          return currentNodes.filter(node => node.data.name !== 'Fleets');
        }
      }
      
      // If no matching handle, return current nodes
      return currentNodes;
  })}



  //------------End of code retraction stuff ----------------------------------------------------------


  
  // Initialize states with empty arrays
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    console.log('Nodes changed:', nodes);
  }, [nodes]);

  
  // Set up nodes and edges when selectedCompany changes
  useEffect(() => {
    if (selectedCompany) {
      console.log("Selected company updated:", selectedCompany.company_name);
      console.log("Current Mode during initialization:", isDarkMode);
      
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
      ];
      const initialEdges = []
      
      console.log("Initial Nodes:", initialNodes);
      console.log("Will set nodes to:", initialNodes);
      
      setNodes(initialNodes);
      setEdges(initialEdges);
    } else {
      console.log("No company selected - clearing nodes");
      setNodes([]);
      setEdges([]);
    }
  }, [selectedCompany]);
  //note to self, I removed isDarkMode here, it was causing nodes to reset 
  // But do keep watch, I dont even remember why it was there but nothing seems off
  // without it so It will stay gone until something breaks or looks off
  
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