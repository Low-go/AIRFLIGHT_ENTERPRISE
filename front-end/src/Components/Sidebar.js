import React from 'react';
import '../ComponentsCss/Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Logo</div>
      <nav>
        <ul>
          <li><button>Dashboard</button></li>
          <li><button>Files</button></li>
          <li><button>Analytics</button></li>
          <li><button>Chat</button></li>
          <li><button>Settings</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;