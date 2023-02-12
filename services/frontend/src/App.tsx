import './index.css';

import Data from './components/Data';
import Import from './components/Import';

function App() {
  return (
    <div className="flex flex-col">
      <div className="center flex h-screen flex-col place-content-center place-items-center">
        <p className="text-2xl font-bold">Upload fasta file</p>
        <Import />
        <Data />
      </div>
    </div>
  );
}

export default App;
