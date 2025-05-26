import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../theme';
import { ReactFlow, addEdge, MiniMap, Controls, Background, StraightEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BigNode from './Nodes/BigNode';
import SmallNode from './Nodes/Small.Node';
import MediumNode from './Nodes/MediumNode';
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import LoadingNode from './Nodes/LoadingNode';
import { useCompany } from '../../contexts/CompanyContext';
import { handleNodeButtonClick, handleSmallNodeButtonClick, handleFleetButtonClick } from '../../utils/nodeGenerationUtils';


const RightScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDarkMode = theme.palette.mode === "dark";
  const { 
    selectedCompany, 
    companyContacts, 
    companyFleets,
    isLoadingContacts,
    isLoadingFleets,
    fetchCompanyContacts,
    fetchCompanyFleets,
    flowNodes,
    setFlowNodes,
    flowEdges,
    setFlowEdges
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
        setFlowEdges,
        setFlowNodes, 
        isDarkMode
      )}
    />,
    smallNode: (props) => <SmallNode 
      {...props} 
      isDarkMode={isDarkMode}
      onHandleClick={(nodeId, handleId) => handleSmallNodeButtonClick(
        nodeId, 
        handleId, 
        setFlowEdges,
        setFlowNodes,
        isDarkMode,
        companyContacts,
        companyFleets,
        isLoadingContacts,
        isLoadingFleets,
        fetchCompanyContacts,
        fetchCompanyFleets,
        selectedCompany
      )}
    />,
    mediumNode: (props) => <MediumNode {...props} isDarkMode={isDarkMode}/>,
    loadingNode: (props) => <LoadingNode {...props} isDarkMode={isDarkMode}/>
  }), [isDarkMode, companyContacts, companyFleets, isLoadingContacts, isLoadingFleets, selectedCompany, setFlowEdges, setFlowNodes]);
  
  // custome handlers to track node positions
  // I get the idea but i don't get it
  const onNodesChange = useCallback(
    (changes) => {
      setFlowNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setFlowNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setFlowEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [setFlowEdges]
  );
  

  useEffect(() => {
    console.log('Nodes changed:', flowNodes);
  }, [flowNodes]);

  
  // Set up nodes and edges when selectedCompany changes
  useEffect(() => {
    if (selectedCompany) {
      console.log("Selected company updated:", selectedCompany.company_name);
      console.log("Current Mode during initialization:", isDarkMode);
      
      // Check if we already have nodes for this company
      if (flowNodes.length > 0) {
        console.log("Using existing nodes for:", selectedCompany.company_name);
        // No need to set nodes if we're already using the context values
      } else {
        console.log("Creating new nodes for:", selectedCompany.company_name);
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
        
        setFlowNodes(initialNodes);
        setFlowEdges(initialEdges);
      }
    } else {
      console.log("No company selected - clearing nodes");
      setFlowNodes([]);
      setFlowEdges([]);
    }
  }, [selectedCompany, colors, setFlowNodes, setFlowEdges, flowNodes]);
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
      setFlowEdges((eds) => addEdge(newEdge, eds));
    },
    [setFlowEdges, isDarkMode]
  );
  
  // Edge style update effect ->>> only needed if isDarkMode changes after edges exist
  useEffect(() => {
    if (flowEdges.length > 0) {
      setFlowEdges(edges => 
        edges.map(edge => ({
          ...edge,
          style: { 
            stroke: isDarkMode ? "#ffffff" : "#000000", 
            strokeWidth: 2
          }
        }))
      );
    }
  }, [isDarkMode, setFlowEdges]);
  
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
      flex= {1}
      bgcolor={colors.primary[400]}
      p="20px"
      borderRadius="4px"
      
    >
      <ReactFlow
        nodes={flowNodes}
        nodeTypes={nodeTypes}
        edges={flowEdges}
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