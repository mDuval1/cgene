import { type FirebaseOptions, initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyB04lZyl_OP-rIEmZjX3i0nuH-Axcp6-yo',
  databaseURL: 'https://cgene-14789-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: '191513261550',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();

export const database = getDatabase(app);
// eslint-disable-next-line no-restricted-globals
if (location.hostname === '127.0.0.1') {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(database, 'localhost', 9000);
}
