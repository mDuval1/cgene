import { get, push, set } from 'firebase/database';
import React, { useCallback, useMemo } from 'react';

import { type DataStoreFile } from '../files/types';
import { useFilesRef } from './files';

interface ApiContextType {
  readFiles: () => Promise<DataStoreFile[]>;
  writeFile: (file: DataStoreFile) => Promise<void>;
}

const ApiContext = React.createContext<ApiContextType>({
  readFiles: async () => [],
  writeFile: async () => {},
});

function ApiProvider({ children }: { children: React.ReactNode }) {
  const filesRef = useFilesRef();

  const writeFile = useCallback(
    async (file: DataStoreFile): Promise<void> => {
      if (!filesRef) return;

      const newPostRef = push(filesRef);
      const { description, fileName, sequence, uploadDate } = file;
      await set(newPostRef, {
        description,
        fileName,
        sequence,
        uploadDate,
      });
    },
    [filesRef],
  );

  const readFiles = useCallback(async (): Promise<DataStoreFile[]> => {
    if (!filesRef) return [];
    return await get(filesRef)
      .then((snapshot) => snapshot.val())
      .then((valueObject: Record<string, Omit<DataStoreFile, 'id'>>) =>
        Object.entries(valueObject ?? {}).map(([id, val]) => ({ id, ...val })),
      );
  }, [filesRef]);

  const value = useMemo(() => ({ readFiles, writeFile }), [readFiles, writeFile]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  return React.useContext(ApiContext);
}

export default ApiProvider;
