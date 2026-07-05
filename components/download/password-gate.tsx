"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  uploadId: string;
};

export default function PasswordGate({ uploadId }: Props) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    if (!password) {
      toast.error("Masukkan password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/uploads/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploadId,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      toast.success("Password benar.");

      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border p-6">
      <h1 className="text-2xl font-bold">
        🔒 Protected Download
      </h1>

      <p className="mt-2 text-muted-foreground">
        File ini dilindungi password.
      </p>

      <Input
        className="mt-6"
        type="password"
        placeholder="Masukkan password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className="mt-4 w-full"
        disabled={loading}
        onClick={handleUnlock}
      >
        {loading ? "Memverifikasi..." : "Unlock"}
      </Button>
    </div>
  );
}