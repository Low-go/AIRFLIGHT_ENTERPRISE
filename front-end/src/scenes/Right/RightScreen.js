import React, { useCallback, useEffect } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../theme';
import { ReactFlow, useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, StraightEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BigNode from './Nodes/BigNode';
import SmallNode from './Nodes/Small.Node';
import  HubOutlinedIcon  from "@mui/icons-material/HubOutlined";
import { useCompany } from '../../contexts/CompanyContext';

const RightScreen = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isDarkMode = theme.palette.mode === "dark";
    const { selectedCompany } = useCompany(); // should i make another variable inside?
    
    const nodeTypes = {
        bigNode: (props) => <BigNode {...props} isDarkMode={isDarkMode}/>,
        smallNode: (props) => <SmallNode {...props} isDarkMode={isDarkMode}/>
    };
    
    // still test
    const initialNodes = [
        {
          id: '1',
          type: 'bigNode',
          position: { x: 100, y: 100 },
          data: {
            name: 'Company Name',
            colors: colors,
          }
        },
        {
            id: '2',
            type: 'smallNode',
            position: { x: 400, y: 50 },
            data: {
              name: 'Small Node',
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
        sourceHandle: 'top-right-handle', // placing id to specify where it should go
        targetHandle: 'left-handle',
      } 
    ];
    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    // Literally just for the lines to dynamically change
    useEffect(() => {
        setEdges(edges => 
            edges.map(edge => ({
                ...edge,
                style: { 
                    stroke: isDarkMode ? "#ffffff" : "#000000", 
                    strokeWidth: 2
                }
            }))
        );
    }, [isDarkMode, setEdges]);
    
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
    
    // same as left screen. Placeholder if no company selected
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
        )
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
            >
                <Controls/>
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </Box>
    );
};

export default RightScreen;