import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiFileAddLine } from 'react-icons/ri';

import useUploadFileToLocalStore from '../../../../services/files/upload/uploadFile';
import Button from '../../../Atomic/Button';

function UploadFile() {
  const uploadFile = useUploadFileToLocalStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        uploadFile(file);
      }
    },
    [uploadFile],
  );
  const { open } = useDropzone({ onDrop });

  const handleClickUploadButton = () => {
    open();
  };

  return (
    <Button onClick={handleClickUploadButton}>
      <RiFileAddLine size={20} />
    </Button>
  );
}

export default UploadFile;
