import React from 'react';
import { Search } from 'lucide-react';
import '../ComponentsCss/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">AIRFLIGHT ENTERPRISE</div>
      
      <div className="header-right">
        <nav>
          <ul className="nav-list">
            {['Information', 'Video Tutorial', 'TipMe'].map((item) => (
              <li key={item}>
                <a href="#" className="nav-link">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <button className="search-button">
          <Search size={20} />
          <span>Search</span>
        </button>
        
        <button className="reset-button">
          Reset Tree
        </button>
      </div>
    </header>
  );
};

export default Header;