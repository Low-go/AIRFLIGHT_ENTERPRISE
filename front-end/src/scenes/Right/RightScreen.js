import React, { useCallback } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../theme';
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const RightScreen = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // React flow initial test first flow
    const initialNodes = [
        { id: '1', position: { x: 0, y: 0}, data: {label: '1'}},
        { id: '2', position: { x: 0, y: 100}, data: {label: '2'}}
    ];

    const initialEdges = [ { id: 'e1-2', source: '1', target: '2'} ];


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <Box
            flex="1" 
            bgcolor={colors.primary[400]}
            p="20px"
            borderRadius="4px"
        >
            {/* <Typography variant="h6" color={colors.grey[100]}>
                Right Grid Content
            </Typography> */}

            <ReactFlow 
                nodes= {nodes} 
                edges = {edges} 
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}/>
        </Box>
    )
}

export default RightScreen
