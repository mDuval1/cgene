import { useSelectedFile } from '../../stores/fileSelectionStore';
import SequenceView from '../SequenceViewer/SequenceViewer';

function FileViewer() {
  const file = useSelectedFile();

  if (!file) {
    return <p>Upload a file to begin with</p>;
  }
  const { sequence } = file;

  return <SequenceView sequence={sequence} />;
}

export default FileViewer;
