import './index.css';

import { Route, Routes } from 'react-router-dom';

import RequireAuthentication from './components/hoc/RequireAuthentication';
import GlobalLayout from './pages/GlobalLayout';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import ROUTES from './pages/routes';
import AuthenticationProvider from './services/authentication/AuthenticationProvider';

function App() {
  return (
    <AuthenticationProvider>
      <Routes>
        <Route element={<GlobalLayout />} errorElement={<NotFound />}>
          <Route path={ROUTES.Root} element={<PublicPage />} />
          <Route path={ROUTES.Login} element={<Login />} />
          <Route path={ROUTES.Logout} element={<Register />} />
          <Route
            path={ROUTES.App}
            element={
              <RequireAuthentication>
                <MainPage />
              </RequireAuthentication>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthenticationProvider>
  );
}

function PublicPage() {
  return <h3>I am the public facing page</h3>;
}

export default App;
