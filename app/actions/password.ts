"use server";

import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function setUploadPassword(
  uploadId: string,
  password: string
) {
  const hash = await bcrypt.hash(password, 10);

  const { error } = await supabaseAdmin
    .from("uploads")
    .update({
      password_hash: hash,
    })
    .eq("id", uploadId);

  if (error) throw error;
}

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