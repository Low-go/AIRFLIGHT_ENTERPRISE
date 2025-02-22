import React, { useCallback } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../../theme';
import { ReactFlow, useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const RightScreen = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // React flow initial test first flow
    const initialNodes = [
            { 
                id: '1', 
                position: { x: 100, y: 100}, 
                style: {
                    background: 'linear-gradient(180deg, #1F2A40 0%, #141B2D 100%)',
                    border: '2px solid #4CCEAC',
                    padding: '15px',
                    borderRadius: '8px',
                    width: 200,
                    fontSize: '16px',
                    color: '#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
                data: { 
                    label: 'Company Name'
                }
            }
        // { id: '2', position: { x: 0, y: 100}, data: {label: '2'}}
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

export default RightScreen
