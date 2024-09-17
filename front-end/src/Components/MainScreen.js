import React from 'react';
import LeftScreen from './LeftScreen';
import RightScreen from './RightScreen';
import '../ComponentsCss/MainScreen.css';

function MainScreen() {
  return (
    <div className='main-screen'>
      <LeftScreen/>
      <RightScreen/>
    </div>
  )
}

export default MainScreen
