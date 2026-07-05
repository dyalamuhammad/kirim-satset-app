"use server";

import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase/server";

// buat password oleh pengirim
export async function setUploadPassword(
  uploadId: string,
  password: string
) {
  const hash = await bcrypt.hash(password, 10);

  const { data } = await supabaseAdmin
    .from("uploads")
    .select("password_hash")
    .eq("id", uploadId)
    .single();

    if (data?.password_hash) {
    throw new Error("Password sudah diaktifkan.");
    }

  const { error } = await supabaseAdmin
    .from("uploads")
    .update({
      password_hash: hash,
    })
    .eq("id", uploadId);

  if (error) throw error;
}

// verifikasi password oleh penerima

export async function verifyPassword(
  uploadId: string,
  password: string
) {
  const { data, error } = await supabaseAdmin
    .from("uploads")
    .select("password_hash")
    .eq("id", uploadId)
    .single();

  if (error) throw error;

  if (!data.password_hash) {
    return true;
  }

  return bcrypt.compare(password, data.password_hash);
}

// cek password sudah ada belum
export async function hasPassword(uploadId: string) {
  const { data, error } = await supabaseAdmin
    .from("uploads")
    .select("password_hash")
    .eq("id", uploadId)
    .single();

  if (error) throw error;

  return !!data.password_hash;
}