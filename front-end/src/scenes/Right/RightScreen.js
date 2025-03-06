import React, { useCallback, useEffect } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../theme';
import { ReactFlow, useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, StraightEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BigNode from './Nodes/BigNode';
import SmallNode from './Nodes/Small.Node';

const RightScreen = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isDarkMode = theme.palette.mode === "dark";
    
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
            position: { x: 300, y: 200 },
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
        animated: true
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