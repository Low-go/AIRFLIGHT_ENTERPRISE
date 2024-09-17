import React from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';
import '../ComponentsCss/RightScreen.css';


function RightScreen({ isLeftPanelOpen }) {
  const nodes = [];
  const edges = [];

  return (
    <div className={`right-screen ${!isLeftPanelOpen ? 'full-width' : ''}`}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#aaa" gap={16} variant="dots" />
      </ReactFlow>
    </div>
  );
}

export default RightScreen
