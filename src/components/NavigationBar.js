import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaReact } from 'react-icons/fa';
import LoginButton from '../components/login/LoginButton';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useMember } from '../contexts/MemberContext';


const NavigationBar = () => {

  const { memberId } = useMember();
  const [isLogin, setIsLogin] = useState(false)
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogin(true)
    }
  });

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: '1px solid #ccc',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaReact style={{ fontSize: '1rem', color: '#61DBFB', marginRight: '1rem' }} />
        <Link to="/" style={{ marginRight: '1rem' }} className="fw-semibold link-offset-2 link-underline text-info link-underline-opacity-0">
          home
        </Link>
        {(memberId && isLogin) && (
          <>
            <Link to="/chat" style={{ marginRight: '1rem' }} className="fw-semibold link-offset-2 link-underline text-info link-underline-opacity-0">
              Chat
            </Link>
            <Link to="/chatArchive" style={{ marginRight: '1rem' }} className="fw-semibold link-offset-2 link-underline text-info link-underline-opacity-0">
              Archive
            </Link>
          </>
        )}
      </div>
      <div>
        <LoginButton />
      </div>
    </nav>
  );
};

export default NavigationBar;