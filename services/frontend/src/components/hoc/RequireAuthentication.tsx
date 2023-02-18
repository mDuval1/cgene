import { Navigate, useLocation } from 'react-router-dom';

import ROUTES from '../../pages/routes';
import { useAuthentication } from '../../services/authentication/AuthenticationProvider';

function RequireAuthentication({ children }: { children: JSX.Element }) {
  const { isAuthenticated, hasComputedAuth } = useAuthentication();
  const location = useLocation();

  if (!isAuthenticated && hasComputedAuth) {
    return <Navigate to={ROUTES.Login} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuthentication;
