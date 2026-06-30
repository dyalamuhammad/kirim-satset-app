"use server";

import { supabaseAdmin } from "@/lib/supabase/server";

export async function getDownloadUrl(path: string) {
  const { data, error } = await supabaseAdmin.storage
    .from("uploads")
    .createSignedUrl(path, 60, {
        download: true,
    }); // berlaku 60 detik

  if (error) {
    throw error;
  }

  return data.signedUrl;
}