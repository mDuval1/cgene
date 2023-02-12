import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import useDataStore from '../stores/dataStore';

export default function Import() {
  const { addFile } = useDataStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        file
          .text()
          .then((text) => {
            const textLines = text.split('\n');
            if (textLines.length === 0) return;
            const header = textLines[0];
            const content = textLines.slice(1).join('');
            addFile({
              fileName: file.name,
              header,
              sequence: content,
            });
          })
          .catch(() => {
            // eslint-disable-next-line no-console
            console.error('Problem processing text');
          });
      }
      // Do something with the files
    },
    [addFile],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="w-50 flex h-20 flex-col place-content-center rounded-md bg-slate-300 hover:cursor-pointer hover:bg-slate-400"
    >
      <input {...getInputProps()} />
      <p className="px-8">Drag and drop some files here, or click to select files</p>
    </div>
  );
}
