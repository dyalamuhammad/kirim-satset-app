"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { setDeleteAfterFirstDownload } from "@/app/actions/delete-after-first-download";


type Props = {
  uploadId: string;
};

export default function DeleteAfterFirstDownload({
  uploadId,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (checked: boolean) => {
    startTransition(async () => {
      try {
        await setDeleteAfterFirstDownload(uploadId, checked);

        toast.success(
          checked
            ? "Delete after first download diaktifkan."
            : "Delete after first download dinonaktifkan."
        );
      } catch {
        toast.error("Gagal menyimpan pengaturan.");
      }
    });
  };

  return (
    <div className="mt-6 flex items-center justify-between rounded-lg border p-4">
      <div>
        <Label>Delete after first download</Label>

        <p className="text-sm text-muted-foreground">
          File tidak dapat diakses lagi setelah berhasil diunduh sekali.
        </p>
      </div>

      <Switch
        disabled={isPending}
        onCheckedChange={handleChange}
      />
    </div>
  );
}