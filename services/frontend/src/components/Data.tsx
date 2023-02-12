import useDataStore from '../stores/dataStore';

export default function Data() {
  const { files } = useDataStore();

  return (
    <div className="w-50  flex flex-col">
      {files.map((file) => {
        const { header, sequence } = file;
        return (
          <div className="my-8 mx-32 rounded-md bg-slate-100 p-8" key={sequence.slice(4)}>
            <p className="my-2">{header}</p>
            <p className="break-all">{sequence}</p>
          </div>
        );
      })}
    </div>
  );
}
