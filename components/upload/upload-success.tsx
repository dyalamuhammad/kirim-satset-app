"use client";

import { Button } from "@/components/ui/button";

type Props = {
  shareUrl: string;
  onReset: () => void;
};

export default function UploadSuccess({
  shareUrl,
  onReset,
}: Props) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert("Link berhasil disalin!");
  };

  return (
    <div className="space-y-6 text-center">
      <div>
        <h2 className="text-2xl font-bold">🎉 Upload Berhasil</h2>
        <p className="text-muted-foreground mt-2">
          Bagikan link berikut ke penerima.
        </p>
      </div>

      <div className="rounded-lg border bg-muted p-4 break-all">
        {shareUrl}
      </div>

      <div className="flex gap-3">
        <Button className="flex-1" onClick={handleCopy}>
          Copy Link
        </Button>

        <Button variant="outline" className="flex-1" onClick={onReset}>
          Upload Lagi
        </Button>
      </div>
    </div>
  );
}