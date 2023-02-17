import {
  type CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable,
} from '@tanstack/react-table';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { type DataStoreFile } from '../../../services/files/types';
import useDataStore from '../../../stores/dataStore';
import useFileSelectionStore from '../../../stores/fileSelectionStore';
import Button from '../../Atomic/Button';

const columnHelper = createColumnHelper<DataStoreFile>();

function DeleteCell({ info }: { info: CellContext<DataStoreFile, DataStoreFile> }) {
  const { removeFile } = useDataStore();
  const handleDeleteClick = () => {
    const {
      row: {
        original: { id },
      },
    } = info;
    removeFile(id);
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
            const backgroundColor = isRowSelected ? 'bg-slate-300' : 'white';
            const hoverColorClass = isRowSelected ? '' : 'hover:bg-slate-200';
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
      <p className="text-2xl font-bold">Local files</p>
      <FilesTable />
    </div>
  );
}

export default Files;
