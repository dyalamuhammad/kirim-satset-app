"use server";

import { supabaseAdmin } from "@/lib/supabase/server";

export async function createArchiveJob(uploadId: string) {
  const { error } = await supabaseAdmin
    .from("archives")
    .insert({
      upload_id: uploadId,
    });

  if (error) throw error;
}