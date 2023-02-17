import './index.css';

import React, { Suspense } from 'react';
import Pane, { type SplitPaneProps } from 'react-split-pane';

const Files = React.lazy(async () => await import('./components/Layout/Files/Files'));
const FileViewer = React.lazy(async () => await import('./components/Layout/FileViewer'));
const TopBar = React.lazy(async () => await import('./components/Layout/TopBar/TopBar'));

function SplitPane({ children, ...props }: React.PropsWithChildren<SplitPaneProps>) {
  return <Pane {...props}>{children}</Pane>;
}

function App() {
  return (
    <div className="relative h-screen">
      <SplitPane split="horizontal" minSize={48} maxSize={48} size={48}>
        <Suspense fallback={null}>
          <TopBar />
        </Suspense>
        <div className="flex flex-col place-items-center " id="topbar">
          <SplitPane split="vertical" minSize={50} maxSize={400} size={150}>
            <div>Sidebar for files</div>
            <SplitPane
              split="horizontal"
              size={400}
              maxSize={500}
              pane2Style={{ overflow: 'auto' }}
            >
              <Suspense fallback={null}>
                <Files />
              </Suspense>
              <Suspense fallback={null}>
                <FileViewer />
              </Suspense>
            </SplitPane>
          </SplitPane>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
