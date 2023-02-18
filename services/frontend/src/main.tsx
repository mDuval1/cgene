import './index.css';

import { type FirebaseOptions, initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyB04lZyl_OP-rIEmZjX3i0nuH-Axcp6-yo',
  projectId: '191513261550',
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
