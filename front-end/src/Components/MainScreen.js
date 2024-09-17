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
      <LeftScreen isOpen={isLeftPanelOpen} togglePanel={toggleLeftPanel}/>
      <div className='screen-divider'></div>
      <RightScreen isLeftPanelOpen={isLeftPanelOpen}/>
    </div>
  )
}

export default MainScreen
