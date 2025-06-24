// MemberContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getMemberId } from '../utils/api';

const MemberContext = createContext();

export const fetchMemberId = async (setMemberId, setIsLoading) => {
    try {
      const res = await getMemberId();

      if (res.status === 401) {
        setMemberId(null);
        console.warn('로그인되지 않은 사용자입니다.');
        return;
      }

      if (res.ok) {
        const id = await res.text();
        setMemberId(id);
      } else {
        console.error('예상치 못한 응답 상태:', res.status);
      }
    } catch (error) {
      console.error('getMemberId 호출 중 오류 발생:', error);
    } finally {
    setIsLoading(false);}
  };

export const MemberProvider = ({ children }) => {

  const [memberId, setMemberId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMemberId(setMemberId, setIsLoading);
  }, []);

  return (
     <MemberContext.Provider value={{ memberId, setMemberId, fetchMemberId, isLoading, setIsLoading  }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);