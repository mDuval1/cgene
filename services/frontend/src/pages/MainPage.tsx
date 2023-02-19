import '../index.css';

import React from 'react';
import Pane, { type SplitPaneProps } from 'react-split-pane';

import Files from '../components/Layout/Files/Files';
import FileViewer from '../components/Layout/FileViewer';
import TopBar from '../components/Layout/TopBar/TopBar';

function SplitPane({ children, ...props }: React.PropsWithChildren<SplitPaneProps>) {
  return <Pane {...props}>{children}</Pane>;
}

function MainPage() {
  return (
    <div className="relative h-screen">
      <SplitPane split="horizontal" minSize={48} maxSize={48} size={48}>
        <TopBar />
        <div className="flex flex-col place-items-center " id="topbar">
          <SplitPane split="vertical" minSize={50} maxSize={400} size={150}>
            <div>Sidebar for files</div>
            <SplitPane
              split="horizontal"
              size={400}
              maxSize={500}
              pane2Style={{ overflow: 'auto' }}
            >
              <Files />
              <FileViewer />
            </SplitPane>
          </SplitPane>
        </div>
      </SplitPane>
    </div>
  );
}

export default MainPage;
