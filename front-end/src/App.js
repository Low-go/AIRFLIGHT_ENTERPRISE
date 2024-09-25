import React from 'react';
import { ReactFlow } from 'react-flow-renderer';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import DiagramArea from './Components/DiagramArea';
import TableArea from './Components/TableArea';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <DiagramArea />
          <TableArea />
        </div>
      </div>
    </div>
  );
};

export default App;