import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import ROUTES from '../../pages/routes';

interface AuthContextType {
  hasComputedAuth: boolean;
  isAuthenticated: boolean;
  register: (email: string, password: string, callback: VoidFunction) => void;
  signin: (email: string, password: string, callback: VoidFunction) => void;
  signout: (callback?: VoidFunction) => void;
  user: User | null;
}

const AuthContext = React.createContext<AuthContextType>({
  hasComputedAuth: false,
  isAuthenticated: false,
  register: (email: string, password: string) => {},
  signin: () => {},
  signout: () => {},
  user: null,
});

function AuthenticationProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasComputedAuth, setHasComputedAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((userState) => {
      setHasComputedAuth(true);
      if (userState) {
        setUser(userState);
        navigate(ROUTES.App, { replace: true });
      } else {
        setUser(null);
      }
    });
  }, [navigate]);

  const signin = (email: string, password: string, callback: VoidFunction) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user: registeredUser } = userCredential;
        setUser(registeredUser);
        callback();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.error('Error logging in', { errorCode, errorMessage });
      })
      .finally(() => {
        setHasComputedAuth(true);
      });
  };

  const signout = (callback?: VoidFunction) => {
    signOut(auth)
      .then(() => {
        setUser(null);
        callback?.();
      })
      // eslint-disable-next-line n/handle-callback-err
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error logging out');
      })
      .finally(() => {
        setHasComputedAuth(true);
      });
  };

  const register = (email: string, password: string, callback: () => void) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user: registeredUser } = userCredential;
        setUser(registeredUser);
        callback();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.error('Error', { errorCode, errorMessage });
      })
      .finally(() => {
        setHasComputedAuth(true);
      });
  };

  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({ hasComputedAuth, isAuthenticated, register, signin, signout, user }),
    [hasComputedAuth, isAuthenticated, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthentication() {
  return React.useContext(AuthContext);
}

export default AuthenticationProvider;
