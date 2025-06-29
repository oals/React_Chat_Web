import { Navigate } from 'react-router-dom';
import { useMember } from '../contexts/MemberContext';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ children }) => {

  const { memberId, isLoading } = useMember();
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading || isLogin === null) {
    return null;
  }

  if (!isLogin || !memberId) {
    alert('로그인이 필요합니다');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;