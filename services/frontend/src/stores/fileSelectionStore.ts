import { create } from 'zustand';

import { type DataStoreFile } from '../services/files/types';
import useDataStore from './dataStore';

interface FileSelectionStore {
  selectFile: (fileId: null | string) => void;
  selectedFileId: string | null;
}

const useFileSelectionStore = create<FileSelectionStore>((set) => ({
  selectFile: (fileId) => {
    set({ selectedFileId: fileId });
  },
  selectedFileId: null,
}));

export function useSelectedFile(): DataStoreFile | undefined {
  const { selectedFileId } = useFileSelectionStore();
  const { files } = useDataStore();
  return files.find((file) => file.id === selectedFileId);
}

export default useFileSelectionStore;
