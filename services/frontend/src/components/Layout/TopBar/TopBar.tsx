import { TextInput, Tooltip } from 'flowbite-react';
import { RiDownload2Fill } from 'react-icons/ri';

import Button from '../../Atomic/Button';
import UploadFile from './components/UploadFile';

function TopBar() {
  return (
    <div className="flex w-full flex-row justify-between" id="topbar">
      <div className="flex flex-row items-center" id="left-group">
        <div className="mx-8 font-bold" id="icon">
          <p>CGene</p>
        </div>
        <div className="mx-8 flex flex-row" id="main-toolbar">
          <Tooltip content="Upload" trigger="hover">
            <div className="mx-4">
              <UploadFile />
            </div>
          </Tooltip>
          <Tooltip content="Export" trigger="hover">
            <Button>
              <RiDownload2Fill size={20} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="mr-8 flex flex-row items-center" id="main-toolbar">
        <TextInput id="search" type="text" placeholder="Search sequence" sizing="sm" />
      </div>
    </div>
  );
}

export default TopBar;
