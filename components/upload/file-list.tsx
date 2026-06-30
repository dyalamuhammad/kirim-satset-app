type FileListProps = {
  files: File[];
};

export default function FileList({ files }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center justify-between rounded-lg border p-3"
        >
          <span className="truncate">{file.name}</span>

          <span className="text-sm text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
      ))}
    </div>
  );
}