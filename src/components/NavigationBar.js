// 예: NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';

const NavigationBar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #ccc',
      }}
    >

      <div style={{ marginRight: '1.5rem' }}>
        <FaReact style={{ fontSize: '1.5rem', color: '#61DBFB' }} />
         <span className="p-1 fw-semibold"> Chat-X </span>
      </div>

      <Link to="/" style={{ marginRight: '1rem' }} className="fw-semibold link-offset-2 link-underline link-underline-opacity-0">
        Home
      </Link>
      <Link to="/about" style={{ marginRight: '1rem'}} className="fw-semibold link-offset-2 link-underline link-underline-opacity-0">
        About
      </Link>
     <Link to="/chat" style={{ marginRight: '1rem'}} className="fw-semibold link-offset-2 link-underline link-underline-opacity-0">
        Chat
     </Link>
    </nav>
  );
};

export default NavigationBar;