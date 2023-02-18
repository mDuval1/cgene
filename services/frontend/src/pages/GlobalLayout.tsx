import { Button } from 'flowbite-react';
import { RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useAuthentication } from '../services/authentication/AuthenticationProvider';
import ROUTES from './routes';

function GlobalLayout() {
  const { isAuthenticated, signout } = useAuthentication();
  const location = useLocation();
  const isOnWebsite = location.pathname === '/';

  const handleClickOnSignout = () => {
    signout();
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between bg-cyan-100 px-4 py-2">
        <Button size="sm">
          <Link to={ROUTES.Root}>Public website</Link>
        </Button>
        {isAuthenticated && !isOnWebsite ? (
          <Button size="sm" onClick={handleClickOnSignout}>
            <div className="mx-2 flex flex-row items-center">Logout</div>
            <RiLogoutBoxFill size={20} />
          </Button>
        ) : (
          <Button size="sm">
            <div className="flex flex-row items-center">
              <Link to={ROUTES.App} className="mx-2">
                Go to the app
              </Link>
              <RiLoginBoxFill size={20} />
            </div>
          </Button>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default GlobalLayout;
