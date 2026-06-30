"use server";

import { nanoid } from "nanoid";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function createUpload(file: {
  name: string;
  path: string;
  size: number;
  type: string;
}) {
  const slug = nanoid(8);

  const { data: upload, error: uploadError } = await supabaseAdmin
    .from("uploads")
    .insert({
      slug,
      total_size: file.size,
    })
    .select()
    .single();

  if (uploadError) throw uploadError;

  const { error: fileError } = await supabaseAdmin
    .from("files")
    .insert({
      upload_id: upload.id,
      name: file.name,
      storage_path: file.path,
      size: file.size,
      mime_type: file.type,
    });

  if (fileError) throw fileError;

  return slug;
}