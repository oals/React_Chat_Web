import { Navigate } from 'react-router-dom';
import { useMember } from '../contexts/MemberContext';

const PrivateRoute = ({ children }) => {
  const { memberId, isLoading } = useMember();

  if (isLoading) return null;

  return memberId ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;