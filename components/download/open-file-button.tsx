"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getDownloadUrl, getOpenUrl } from "@/app/actions/download";

type Props = {
  path: string;
};

export default function OpenFileButton({ path }: Props) {
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    const newWindow = window.open("", "_blank");

    if (!newWindow) {
      toast.error("Browser memblokir tab baru.");
      return;
    }

    try {
      setLoading(true);

      const url = await getOpenUrl(path);

      newWindow.location.href = url;
    } catch (error) {
      newWindow.close();

      console.error(error);
      toast.error("Gagal membuka file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full sm:w-fit cursor-pointer"
      onClick={handleOpen}
      disabled={loading}
    >
      <ExternalLink className="mr-2 h-4 w-4" />
      {loading ? "Opening..." : "Open File"}
    </Button>
  );
}