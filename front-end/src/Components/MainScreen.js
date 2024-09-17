import React, { useState } from 'react';
import LeftScreen from './LeftScreen';
import RightScreen from './RightScreen';
import '../ComponentsCss/MainScreen.css';

function MainScreen() {

  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);

  const toggleLeftPanel = () => {
    setIsLeftPanelOpen(!isLeftPanelOpen);
  };

  return (
    <div className='main-screen'>
      <LeftScreen isOpen={isLeftPanelOpen} />
      <div className="screen-divider"></div>
      <RightScreen isLeftPanelOpen={isLeftPanelOpen} />
      <button className={`toggle-button ${isLeftPanelOpen ? 'open' : 'closed'}`} onClick={toggleLeftPanel}>
        {isLeftPanelOpen ? '←' : '→'}
      </button>
    </div>
  );
}

export default MainScreen
