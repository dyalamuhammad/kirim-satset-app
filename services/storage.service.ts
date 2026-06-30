import { supabase } from "@/lib/supabase/client";

export async function uploadFile(file: File) {
  const fileName = `${crypto.randomUUID()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  return data;
}