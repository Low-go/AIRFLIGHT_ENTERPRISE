import React, { useCallback } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../theme';
import { ReactFlow, useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BigNode from './Nodes/BigNode';

const RightScreen = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isDarkMode = theme.palette.mode === "dark";

    const nodeTypes = {
        bigNode: (props) => <BigNode {...props} isDarkMode={isDarkMode}/> // This tells ReactFlow to use BigNode component when type is 'bigNode'
    };

    // test 
    const initialNodes = [
        {
          id: '1',
          type: 'bigNode',
          position: { x: 100, y: 100 },
          data: {
            name: 'Company Name',
            colors: colors,
          }
        }
    ];
    // const initialEdges = [ { id: 'e1-2', source: '1', target: '2'} ];


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    // const onConnect = useCallback(
    //     (params) => setEdges((eds) => addEdge(params, eds)),
    //     [setEdges],
    // );


    return (
        <Box
            flex="1" 
            bgcolor={colors.primary[400]}
            p="20px"
            borderRadius="4px"
        >

            <ReactFlow 
                nodes= {nodes} 
                nodeTypes={nodeTypes}
                // edges = {edges} 
                onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                // onConnect={onConnect}
               
                >
                <Controls/>
                {/* <MiniMap/> */}
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </Box>
    )
}

export default RightScreen;
