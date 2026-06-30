"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import FileList from "./file-list";
import { Button } from "../ui/button";

import { upload } from "@/services/upload.service";

import UploadSuccess from "./upload-success";
import { toast } from "sonner";
import { Progress } from "../ui/progress";

export default function UploadDropzone() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: isUploading,
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);

      const shareUrl = await upload(files, (progress, status) => {
        setProgress(progress);
        setStatus(status);
      });
      setProgress(10);
      setStatus("Membuat upload...");
      toast.success("Upload berhasil!");

      setShareUrl(shareUrl);
      setFiles([]);
    } catch (error) {
      console.error(error);
      setProgress(0);
      setStatus("");

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
      className={`flex h-72 items-center justify-center rounded-xl border-2 border-dashed transition-all
      ${
        isUploading
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer"
      }
      ${
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/30"
      }`}
          
          >
            <input {...getInputProps()} />

            <div className="space-y-2 text-center">
            <p className="text-lg font-medium">
        {isUploading
          ? "Uploading..."
          : isDragActive
          ? "Lepaskan file di sini"
          : "Drag & Drop file di sini"}
      </p>

      <p className="text-sm text-muted-foreground">
        {isUploading
          ? "Mohon tunggu hingga proses selesai."
          : "atau klik untuk memilih file"}
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
          <Progress value={progress} className="mt-4" />

      <p className="mt-2 text-center text-sm text-muted-foreground">
        {status}
      </p>
    </div>
  );
}