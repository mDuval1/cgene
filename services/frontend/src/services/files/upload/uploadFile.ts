import { v4 as uuidv4 } from 'uuid';

import useDataStore from '../../../stores/dataStore';
import { useApi } from '../../api/ApiProvider';
import { type DataStoreFile } from '../types';
import readFastaFile from './readFastaFile';

export const saveFileToLocalDataStore =
  (callback: (data: DataStoreFile) => void) =>
  async (file: File): Promise<void> => {
    readFastaFile(file)
      .then((fileDetails) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
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

function useUploadFileToLocalStore(): (file: File) => Promise<void> {
  const { addFile } = useDataStore();
  const { writeFile } = useApi();

  const callback = (newFile: DataStoreFile): void => {
    addFile(newFile);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    writeFile(newFile);
  };

  return saveFileToLocalDataStore(callback);
}

export default useUploadFileToLocalStore;
