import {
  type CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable,
} from '@tanstack/react-table';
import { remove } from 'firebase/database';
import { Button, Tooltip } from 'flowbite-react';
import { RiDeleteBin5Line, RiRefreshFill } from 'react-icons/ri';

import { useFileRef, useFiles } from '../../../services/api/files';
import { type DataStoreFile } from '../../../services/files/types';
import useDataStore from '../../../stores/dataStore';
import useFileSelectionStore from '../../../stores/fileSelectionStore';

const columnHelper = createColumnHelper<DataStoreFile>();

function DeleteCell({ info }: { info: CellContext<DataStoreFile, DataStoreFile> }) {
  const { removeFile } = useDataStore();
  const {
    row: {
      original: { id },
    },
  } = info;

  const fileRef = useFileRef(id);
  const handleDeleteClick = () => {
    if (fileRef) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      remove(fileRef);
      removeFile(id);
    }
  };

  return (
    <Button onClick={handleDeleteClick}>
      <RiDeleteBin5Line />
    </Button>
  );
}

const columns = [
  columnHelper.accessor('fileName', {
    cell: (info) => info.renderValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('description', {
    cell: (info) => (
      <div className="h-10 w-48 overflow-hidden">
        <p className="text-ellipsis">{info.getValue()}</p>
      </div>
    ),
    header: () => <span>Description</span>,
  }),
  columnHelper.accessor((row) => row.sequence.length, {
    cell: (info) => info.renderValue(),
    header: () => <span>Sequence length</span>,
    id: 'sequenceLength',
  }),
  columnHelper.accessor((row) => row, {
    cell: (info) => <DeleteCell info={info} />,
    header: () => <span>Actions</span>,
    id: 'actions',
  }),
];

function FilesTable() {
  const { files } = useDataStore();
  const { fetch: refetchFiles } = useFiles();
  const { selectFile, selectedFileId } = useFileSelectionStore();

  const table = useReactTable({
    columns,
    data: files,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClickOnRow = (row: Row<DataStoreFile>) => {
    const {
      original: { id },
    } = row;
    selectFile(id);
  };

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between px-2">
        <p className="text-2xl font-bold">Local files</p>
        <Tooltip content="Refresh">
          <Button
            onClick={() => {
              refetchFiles();
            }}
          >
            <RiRefreshFill size={20} />
          </Button>
        </Tooltip>
      </div>
      <table className="w-full table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isRowSelected = row.original.id === selectedFileId;
            const backgroundColor = isRowSelected ? 'bg-slate-200' : 'white';
            const hoverColorClass = isRowSelected ? '' : 'hover:bg-slate-100';
            return (
              <tr
                key={row.id}
                className={` hover:cursor-pointer ${hoverColorClass} ${backgroundColor}`}
                onClick={() => {
                  handleClickOnRow(row);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Files() {
  return (
    <div className="place-items-left flex w-full flex-col overflow-auto p-4" id="list-files">
      <FilesTable />
    </div>
  );
}

export default Files;
