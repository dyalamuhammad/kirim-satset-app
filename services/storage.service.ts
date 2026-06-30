import { supabase } from "@/lib/supabase/client";

export async function uploadFile(
  uploadId: string,
  file: File
) {
  const path = `${uploadId}/${file.name}`;

  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(path, file);

  if (error) throw error;

  return data;
}