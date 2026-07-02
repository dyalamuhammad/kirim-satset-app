"use client";

import { getDownloadUrl } from "@/app/actions/download";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  path: string;
};

export default function DownloadButton({ path }: Props) {
    const [loading, setLoading] = useState(false);


const handleDownload = async () => {
  if (loading) return;

  try {
    setLoading(true);

    const url = await getDownloadUrl(path);

    toast.success("Download dimulai.");

    window.location.href = url;
  } catch (error) {
    console.error(error);
    toast.error("Gagal mengunduh file.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Button className="cursor-pointer w-full sm:w-fit" onClick={handleDownload} disabled={loading}>
      {loading ? "Downloading..." : "Download"}
    </Button>
  );
}