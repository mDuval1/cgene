import { type SequenceFileReader } from './readFile';

const readFastaFile: SequenceFileReader = async (file) =>
  await file.text().then((text) => {
    const textLines = text.split('\n');
    if (textLines.length === 0) throw new Error('No lines found in file');
    const description = textLines[0].slice(1).trimStart();
    const content = textLines.slice(1).join('');
    return {
      description,
      sequence: content,
    };
  });

export default readFastaFile;
