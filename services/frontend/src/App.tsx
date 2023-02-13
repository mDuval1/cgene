import './index.css';

import Pane, { type SplitPaneProps } from 'react-split-pane';

import Data from './components/Data';
import Import from './components/Import';
import SequenceView from './components/SequenceViewer';

function SplitPane({ children, ...props }: React.PropsWithChildren<SplitPaneProps>) {
  return <Pane {...props}>{children}</Pane>;
}

function App() {
  return (
    <div className="relative h-screen">
      <SplitPane split="horizontal" minSize={48} maxSize={48} size={48}>
        <div className="flex w-full flex-col place-items-center bg-cyan-600" id="topbar">
          Top bar
        </div>
        <div className="flex flex-col place-items-center " id="topbar">
          <SplitPane split="vertical" minSize={50} maxSize={400} size={100}>
            <div>Sidebar for files</div>
            <SplitPane
              split="horizontal"
              size={200}
              maxSize={500}
              pane2Style={{ overflow: 'scroll' }}
            >
              <div className="flex flex-col place-items-center" id="list-files">
                <p className="text-2xl font-bold">Upload fasta file</p>
                <Import />
                <Data />
              </div>
              <div id="file-details">
                <div className="flex flex-col place-content-end bg-cyan-50">
                  <p className="text-2xl font-bold">Sequence section</p>
                  <div>Toto</div>
                  <SequenceView sequence="GAACAAATGTGTAATTACACGAACGCAACCCAGCTAGTCTGGCCTGCCCAACGTGGGAGGTGAAAGGAGCTTGCGACTGGCATGACGCTAGTCAGTCGCTGTTCCCTGGTCGAGTGCGTCCGTAAGTTCGTGGGTTTCTACTTGATCTCCGCCTGCTTTACCGATGCTTAGCTAGTAGGGTTCTTATATCGCGGAGACGCTGTCGCTGTGTCACCAGTAAACTAGCGGGTGCTAGTACGGAAGTCAATGGGGTGTATTTTCCCCGACGGCCTCGGGGTGGTACTGCTAGCGTCATCGTGATGCTGTTGCTCTGTAGTGCGAGCGCCCTGGGCCGGTAGAGAGCTCCCCCTGCTTTGTCGGCTAGTCTATCTATTGTCTCGTTCAAAGTGGTCGGGATTTCGTCAGTCCCATGGTTCAGTATAACAATAGCTCCAGGGCTAAATATCACCCCTTCACGTTCCATGGTGTTCCATGAAGTACGTCGTTGAGAGTGTGTCCCA" />
                </div>
              </div>
            </SplitPane>
          </SplitPane>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
