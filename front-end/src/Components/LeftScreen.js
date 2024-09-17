import React from 'react';
import '../ComponentsCss/LeftScreen.css';

function LeftScreen({ isOpen, togglePanel }) {
  return (
    <div className={`left-screen ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={togglePanel}>
        {isOpen ? '←' : '→'}
      </button>
      <h1>Information Display</h1>
    </div>
  );
}

export default LeftScreen
