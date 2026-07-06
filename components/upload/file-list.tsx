import {
  X,
  File,
  FileImage,
  FileText,
  FileArchive,
  FileSpreadsheet,
  FileCode,
  FileVideo,
  FileAudio,
} from "lucide-react";
import { Button } from "../ui/button";

type FileListProps = {
  files: File[];
  isUploading: boolean;
  onRemove: (file: File) => void;
};

export default function FileList({ 
  files,
  isUploading,
  onRemove,
 }: FileListProps) {
  if (files.length === 0) return null;

  const getFileIcon = (file: File) => {
  const type = file.type;
  const ext = file.name.split(".").pop()?.toLowerCase();

  // Images
  if (type.startsWith("image/")) {
    return <FileImage className="h-5 w-5 text-blue-500" />;
  }

  // PDF
  if (type === "application/pdf" || ext === "pdf") {
    return <FileText className="h-5 w-5 text-red-500" />;
  }

  // Word
  if (
    [
      "doc",
      "docx",
    ].includes(ext ?? "")
  ) {
    return <FileText className="h-5 w-5 text-blue-600" />;
  }

  // Excel / CSV
  if (
    [
      "xls",
      "xlsx",
      "csv",
    ].includes(ext ?? "")
  ) {
    return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
  }

  // ZIP / RAR / 7z
  if (
    [
      "zip",
      "rar",
      "7z",
      "tar",
      "gz",
    ].includes(ext ?? "")
  ) {
    return <FileArchive className="h-5 w-5 text-amber-600" />;
  }

  // Video
  if (type.startsWith("video/")) {
    return <FileVideo className="h-5 w-5 text-purple-500" />;
  }

  // Audio
  if (type.startsWith("audio/")) {
    return <FileAudio className="h-5 w-5 text-pink-500" />;
  }

  // Code
  if (
    [
      "js",
      "ts",
      "tsx",
      "jsx",
      "json",
      "html",
      "css",
    ].includes(ext ?? "")
  ) {
    return <FileCode className="h-5 w-5 text-orange-500" />;
  }

  // Default
  return <File className="h-5 w-5 text-muted-foreground" />;
};

  return (
    <div className="mt-4 space-y-2">
      {files.map((file, index) => (
       <div
  key={`${file.name}-${index}`}
  className="flex items-center rounded-lg border p-3"
>
  <div className="mr-3 shrink-0">
    {getFileIcon(file)}
  </div>

  <span className="flex-1 truncate">
    {file.name}
  </span>

  <div className="ml-4 flex items-center gap-2 shrink-0">
    <span className="text-sm text-muted-foreground">
      {(file.size / 1024 / 1024).toFixed(2)} MB
    </span>

    <Button
      variant="ghost"
      size="icon"
      disabled={isUploading}
      onClick={() => onRemove(file)}
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
</div>
      ))}
    </div>
  );
}