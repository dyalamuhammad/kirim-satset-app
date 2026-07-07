"use server";

import { supabaseAdmin } from "@/lib/supabase/server";

export async function setDeleteAfterFirstDownload(
  uploadId: string,
  enabled: boolean
) {
  const { error } = await supabaseAdmin
    .from("uploads")
    .update({
      delete_after_first_download: enabled,
    })
    .eq("id", uploadId);

  if (error) {
    throw error;
  }
}

export async function markUploadAsDeleted(uploadId: string) {
  const { error } = await supabaseAdmin
    .from("uploads")
    .update({
      is_deleted: true,
    })
    .eq("id", uploadId);

  if (error) {
    throw error;
  }
}