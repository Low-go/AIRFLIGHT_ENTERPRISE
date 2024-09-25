import React from 'react';
import ReactFlow from 'react-flow-renderer';
import '../ComponentsCss/DiagramArea.css';

const initialElements = [
  { id: '1', type: 'input', data: { label: 'Input AWS' }, position: { x: 250, y: 25 } },
  { id: '2', data: { label: 'UNION' }, position: { x: 100, y: 125 } },
  { id: '3', data: { label: 'SELECT' }, position: { x: 250, y: 250 } },
  { id: '4', type: 'output', data: { label: 'Output AWS' }, position: { x: 250, y: 350 } },
  { id: '5', data: { label: 'Walmart Dataset' }, position: { x: 0, y: 200 } },
  { edge: '1-2', source: '1', target: '2', animated: true },
  { edge: '2-3', source: '2', target: '3', animated: true },
  { edge: '3-4', source: '3', target: '4', animated: true },
  { edge: '5-2', source: '5', target: '2', animated: true, style: { stroke: 'purple' } },
];

const DiagramArea = () => {
  return (
    <div className="diagram-area">
      <ReactFlow elements={initialElements} />
    </div>
  );
};

export default DiagramArea;