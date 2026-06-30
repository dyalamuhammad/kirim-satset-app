"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import FileList from "./file-list";
import { Button } from "../ui/button";

import { upload } from "@/services/upload.service";

import UploadSuccess from "./upload-success";
import { toast } from "sonner";

export default function UploadDropzone() {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
        setFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);

      const shareUrl = await upload(files);
      toast.success("Upload berhasil!");

      setShareUrl(shareUrl);
      setFiles([]);
    } catch (error) {
      console.error(error);

      toast.error("Upload gagal", {
        description: "Terjadi kesalahan saat mengunggah file. Silakan coba lagi.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (shareUrl) {
    return (
      <UploadSuccess
        shareUrl={shareUrl}
        onReset={() => setShareUrl("")}
      />
    );
  }

  return (
    <div className="">

    <div
      {...getRootProps()}
      className={`flex h-72 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/30"
      }`}
    >
      <input {...getInputProps()} />

      <div className="space-y-2 text-center">
        <p className="text-lg font-medium">
          {isDragActive
            ? "Lepaskan file di sini"
            : "Drag & Drop file di sini"}
        </p>

        <p className="text-sm text-muted-foreground">
          atau klik untuk memilih file
        </p>
      </div>
    </div>
    <FileList files={files} />
    {files.length > 0 && (
  <Button
  className="mt-4 w-full"
  onClick={handleUpload}
  disabled={isUploading}
>
  {isUploading ? "Uploading..." : `Upload ${files.length} File${files.length > 1 ? "s" : ""}`}
</Button>
)}
    </div>
  );
}