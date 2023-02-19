import produce from 'immer';
import { create } from 'zustand';

import { type DataStoreFile } from '../services/files/types';

interface DataStore {
  addFile: (file: DataStoreFile) => void;
  files: DataStoreFile[];
  removeFile: (id: string) => void;
  setFiles: (files: DataStoreFile[]) => void;
}

const useDataStore = create<DataStore>((set) => ({
  addFile: (file) => {
    set(
      produce((state) => {
        state.files.push(file);
      }),
    );
  },
  files: [],
  removeFile: (id) => {
    set(({ files }) => ({ files: files.filter((f) => f.id !== id) }));
  },
  setFiles: (files) => {
    set({ files });
  },
}));

export default useDataStore;
