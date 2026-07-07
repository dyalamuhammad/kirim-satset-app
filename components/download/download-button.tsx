"use client";

import { markUploadAsDeleted } from "@/app/actions/delete-after-first-download";
import { getDownloadUrl } from "@/app/actions/download";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  path: string;
  uploadId: string; // or number, depending on your data
  deleteAfterFirstDownload: boolean;
};

export default function DownloadButton({ 
  path, 
  uploadId,
  deleteAfterFirstDownload, 
}: Props) {
    const [loading, setLoading] = useState(false);


const handleDownload = async () => {
  if (loading) return;

  try {
    setLoading(true);

    const url = await getDownloadUrl(path);

     if (deleteAfterFirstDownload) {
      await markUploadAsDeleted(uploadId);
      setConsumed(true);
    }

    

    toast.success("Download dimulai.");

  } catch (error) {
    console.error(error);
    toast.error("Gagal mengunduh file.");
  } finally {
    setLoading(false);
  }
};
const [consumed, setConsumed] = useState(false);

  return (
    <Button className="cursor-pointer w-full sm:w-fit" onClick={handleDownload} disabled={loading || consumed}>
      {loading
  ? "Downloading..."
  : consumed
  ? "Downloaded"
  : "Download"}
    </Button>
  );
}