import { v4 as uuidv4 } from 'uuid';

import useDataStore from '../../../stores/dataStore';
import { type DataStoreFile } from '../types';
import readFastaFile from './readFastaFile';

export const saveFileToLocalDataStore =
  (callback: (data: DataStoreFile) => void) =>
  (file: File): void => {
    readFastaFile(file)
      .then((fileDetails) => {
        callback({
          fileName: file.name,
          ...fileDetails,
          id: uuidv4(),
          uploadDate: new Date(),
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Problem processing text', error);
      });
  };

function useUploadFileToLocalStore(): (file: File) => void {
  const { addFile } = useDataStore();
  return saveFileToLocalDataStore(addFile);
}

export default useUploadFileToLocalStore;
