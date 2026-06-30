import { createUpload, deleteFolder, deleteUpload, saveFiles, updateUpload } from "@/app/actions/upload";
import {  uploadFile } from "./storage.service";

export async function upload(files: File[]) {

  const result = await createUpload();

  const uploadId = result.uploadId;
  try {

    let totalSize = 0;

    const uploadedFiles = [];

    for (const file of files) {
      const uploaded = await uploadFile(uploadId, file);

      uploadedFiles.push({
        name: file.name,
        path: uploaded.path,
        size: file.size,
        type: file.type,
      });

      totalSize += file.size;
    }

    await saveFiles(uploadId, uploadedFiles);

    await updateUpload(uploadId, totalSize);

    return `${window.location.origin}/s/${result.slug}`;
  } catch (error) {
    if (uploadId) {
      await deleteFolder(uploadId);
      await deleteUpload(uploadId);
    }

    throw error;
  }
}