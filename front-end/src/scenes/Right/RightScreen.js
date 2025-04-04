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
import { handleNodeButtonClick, handleSmallNodeButtonClick } from '../../utils/nodeGenerationUtils';


const RightScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDarkMode = theme.palette.mode === "dark";
  const { 
    selectedCompany, 
    companyContacts, 
    companyFleets,
    fetchCompanyContacts,
    fetchCompanyFleets
  } = useCompany();
  // functions from company contact to make api requests
  
  
  // Memoize nodeTypes, no rerenders allowed if nothings changed
  const nodeTypes = useMemo(() => ({
    bigNode: (props) => <BigNode 
      {...props} 
      isDarkMode={isDarkMode}
      onHandleClick={(nodeId, handleId) => handleNodeButtonClick(
        nodeId, 
        handleId, 
        setEdges,
        setNodes, 
        isDarkMode
      )}
    />,
    smallNode: (props) => <SmallNode 
      {...props} 
      isDarkMode={isDarkMode}
      onHandleClick={(nodeId, handleId) => handleSmallNodeButtonClick(
        nodeId, 
        handleId, 
        setEdges,
        setNodes,
        isDarkMode,
        companyContacts,
        companyFleets,
        fetchCompanyContacts,
        fetchCompanyFleets,
        selectedCompany
      )}
    />,
    mediumNode: (props) => <MediumNode {...props} isDarkMode={isDarkMode}/>
  }), [isDarkMode, companyContacts, companyFleets, selectedCompany]);
  
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