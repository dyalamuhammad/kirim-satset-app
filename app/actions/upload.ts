"use server";

import { nanoid } from "nanoid";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function createUpload() {
  const slug = nanoid(8);

  const { data, error } = await supabaseAdmin
    .from("uploads")
    .insert({
      slug,
      total_size: 0,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    uploadId: data.id,
    slug,
  };
}

export async function saveFiles(
  uploadId: string,
  files: {
    name: string;
    path: string;
    size: number;
    type: string;
  }[]
) {
  const { error } = await supabaseAdmin.from("files").insert(
    files.map((file) => ({
      upload_id: uploadId,
      name: file.name,
      storage_path: file.path,
      size: file.size,
      mime_type: file.type,
    }))
  );

  if (error) throw error;
}

export async function updateUpload(
  uploadId: string,
  totalSize: number
) {
  const { error } = await supabaseAdmin
    .from("uploads")
    .update({
      total_size: totalSize,
    })
    .eq("id", uploadId);

  if (error) throw error;
}

export async function deleteUpload(uploadId: string) {
  const { error } = await supabaseAdmin
    .from("uploads")
    .delete()
    .eq("id", uploadId);

  if (error) throw error;
}
export async function deleteFolder(uploadId: string) {
  const { data, error } = await supabaseAdmin.storage
    .from("uploads")
    .list(uploadId);

  if (error) throw error;

  if (!data?.length) return;

  const paths = data.map((file) => `${uploadId}/${file.name}`);

  const { error: removeError } = await supabaseAdmin.storage
    .from("uploads")
    .remove(paths);

  if (removeError) throw removeError;
}