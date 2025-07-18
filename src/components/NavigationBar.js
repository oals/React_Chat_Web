import React from 'react';
import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import LoginButton from '../components/login/LoginButton';

const NavigationBar = () => {

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#111418',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: '1px solid #283039',
      }}
    >
        <div className="d-flex justify-content-between align-items-center w-100">
        <div>
          <FaReact style={{ fontSize: '1rem', color: '#ffffff', marginRight: '1rem' }} />
          <Link to="/" style={{ marginRight: '1rem' }} className=" fw-bold link-offset-2 link-underline text-light link-underline-opacity-0">
            Chat-x
          </Link>
        </div>

          <div className="d-flex align-items-center">
              <LoginButton />
          </div>
      </div>
    </nav>
  );
};

export default NavigationBar;