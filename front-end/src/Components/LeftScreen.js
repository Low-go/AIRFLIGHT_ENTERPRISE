import React from 'react';
import '../ComponentsCss/LeftScreen.css';

function LeftScreen({ isOpen }) {
  return (
    <div className={`left-screen ${isOpen ? 'open' : 'closed'}`}>
      <h1>Information Display</h1>
    </div>
  );
}

export default LeftScreen
