import { createUpload, deleteFolder, deleteUpload, saveFiles, updateUpload } from "@/app/actions/upload";
import {  uploadFile } from "./storage.service";

export async function upload(files: File[], onProgress?: (progress: number, status: string) => void) {
onProgress?.(10, "Membuat upload...");
  const result = await createUpload();
  onProgress?.(30, "Mengunggah file...");

  const uploadId = result.uploadId;
  try {

    let totalSize = 0;

    const uploadedFiles = [];

    for (const file of files) {
      const uploaded = await uploadFile(uploadId, file);
    onProgress?.(80, "Menyimpan metadata...");
      uploadedFiles.push({
        name: file.name,
        path: uploaded.path,
        size: file.size,
        type: file.type,
      });

      totalSize += file.size;
    }

    await saveFiles(uploadId, uploadedFiles);
    onProgress?.(95, "Menyelesaikan upload...");
    await updateUpload(uploadId, totalSize);
    onProgress?.(100, "Selesai");

    return {
      uploadId,
      shareUrl: `${window.location.origin}/s/${result.slug}`,
    };
  } catch (error) {
    if (uploadId) {
      await deleteFolder(uploadId);
      await deleteUpload(uploadId);
    }

    throw error;
  }
}