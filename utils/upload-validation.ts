import { APP_CONFIG } from "@/config/app";

export function validateFiles(files: File[]): string | null {
  const { maxFiles, maxFileSize, maxTotalSize } = APP_CONFIG.upload;

  if (files.length > maxFiles) {
    return `Maksimal ${maxFiles} file.`;
  }

  for (const file of files) {
    if (file.size > maxFileSize) {
      return `${file.name} melebihi batas ${maxFileSize / 1024 / 1024} MB.`;
    }
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (totalSize > maxTotalSize) {
    return `Total ukuran file melebihi ${maxTotalSize / 1024 / 1024} MB.`;
  }

  return null;
}