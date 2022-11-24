import {Navigate, useLocation} from 'react-router-dom';
import {AuthConsumer as useAuth} from './index';

export const ProtectedRoute = ({children}) => {
  const {authed} = useAuth();
  const location = useLocation();
  return authed ? children : <Navigate to={`/login?redirect=${location.pathname}`} />
}
