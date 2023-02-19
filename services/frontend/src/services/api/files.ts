import { type DatabaseReference, ref } from 'firebase/database';
import { useCallback, useEffect } from 'react';

import { database } from '../../firebase';
import useDataStore from '../../stores/dataStore';
import { useAuthentication } from '../authentication/AuthenticationProvider';
import { useApi } from './ApiProvider';

function useFilesPath(): string {
  const { user } = useAuthentication();
  const authId = user?.uid ?? '';
  if (!authId) return '';
  const path = `users/${authId}/files`;
  return path;
}

export const useFilesRef = (): DatabaseReference | null => {
  const path = useFilesPath();
  if (!path) return null;
  return ref(database, path);
};

export const useFileRef = (id: string): DatabaseReference | null => {
  const path = useFilesPath();
  if (!path) return null;
  return ref(database, `${path}/${id}`);
};

export function useFiles(): { fetch: () => void } {
  const { readFiles } = useApi();
  const { setFiles: setFilesInStore } = useDataStore();

  const handleFetch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    readFiles().then((fetchedFiles) => {
      setFilesInStore(fetchedFiles);
    });
  }, [readFiles, setFilesInStore]);

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
  }, [handleFetch]);

  return { fetch: handleFetch };
}
