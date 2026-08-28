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
    if (loading) return;

    try {
      setLoading(true);

      const url = await getOpenUrl(path);

      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
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