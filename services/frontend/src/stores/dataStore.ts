import { create } from 'zustand';

interface DataStoreFile {
  fileName: string;
  header: string;
  sequence: string;
}

interface DataStore {
  addFile: (file: DataStoreFile) => void;
  files: DataStoreFile[];
}

const useDataStore = create<DataStore>((set) => ({
  addFile: (file) => {
    set(({ files }) => {
      files.push(file);
      return { files };
    });
  },
  files: [],
}));

export default useDataStore;
