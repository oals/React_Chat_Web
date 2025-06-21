// MemberContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getMemberId } from '../utils/api';

const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    getMemberId()
      .then(res => res.ok ? res.text() : null)
      .then(id => {
        if (id){
            setMemberId(id);
        }
      });
 }, []);

  return (
    <MemberContext.Provider value={{ memberId, setMemberId }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);