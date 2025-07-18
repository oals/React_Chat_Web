import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence, getAuth } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebaseConfig';
import { fireBaseAuthing, clearCookie } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useMember, fetchMemberId } from '../../contexts/MemberContext';

const LoginButton = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { setMemberId, setIsLoading } = useMember();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
    });

    return () => unsubscribe(); // 구독 해제
  }, []);

  const handleLogin = async () => {
    try {

     const auth = getAuth();

     await setPersistence(auth, browserSessionPersistence);

     const result = await signInWithPopup(auth, provider);

     const idToken = await result.user.getIdToken();

     const res = await fireBaseAuthing(idToken);

     if (await res.status === 200) {
       setUser(result.user);
       fetchMemberId(setMemberId,setIsLoading);
     }

    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

    const handleLogout = async () => {
      try {
        await signOut(auth);

        await clearCookie();

        setUser(null);

        fetchMemberId(setMemberId,setIsLoading);

        navigate('/');

      } catch (error) {
        console.error("로그아웃 실패:", error);
      }
    };


  return (
    <div className=" d-flex align-items-center">
      {user ? (
        <>
          <span className="  me-3 fw-semibold text-light">{user.displayName}</span>
          <button className="btn btn-outline-danger btn-sm " onClick={handleLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button className="btn btn-outline-info custom-hover-white btn-sm" onClick={handleLogin}>
            Google 로그인
          </button>
        </>
      )}
    </div>
  );
};

export default LoginButton;