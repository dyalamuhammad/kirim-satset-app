"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { setUploadPassword } from "@/app/actions/password";


type Props = {
  uploadId: string;
};

export default function PasswordProtection({ uploadId }: Props) {
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isProtected, setIsProtected] = useState(false);

  const handleSave = () => {
    if (password.length < 4) {
      toast.error("Password minimal 4 karakter.");
      return;
    }

    

    startTransition(async () => {
      try {
        await setUploadPassword(uploadId, password);

        setIsProtected(true);
        setPassword("");

        toast.success("Password berhasil diaktifkan.");

        setPassword("");
      } catch (error) {
        console.error(error);

        toast.error("Gagal menyimpan password.");
      }
    });
  };

  return (
    <div className="mt-8 space-y-4 rounded-lg border p-5">
      <div>
        <h3 className="font-semibold">🔒 Protect Download</h3>
        <p className="text-sm text-muted-foreground">
          Penerima harus memasukkan password sebelum dapat mengunduh file.
        </p>
      </div>

     <Input
        type="password"
        placeholder="Masukkan password"
        value={password}
        disabled={isProtected || isPending}
        onChange={(e) => setPassword(e.target.value)}
        />

        <Button
        onClick={handleSave}
        disabled={isPending || isProtected}
        className="w-full"
        >
       {isProtected
        ? "🔒 Password Aktif"
        : isPending
        ? "Menyimpan..."
        : "Aktifkan Password"}
      </Button>
    </div>
  );
}