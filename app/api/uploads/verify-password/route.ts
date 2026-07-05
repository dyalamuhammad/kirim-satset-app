import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { uploadId, password } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("uploads")
    .select("password_hash")
    .eq("id", uploadId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "Upload tidak ditemukan" },
      { status: 404 }
    );
  }

  const valid = await bcrypt.compare(
    password,
    data.password_hash ?? ""
  );

  if (!valid) {
    return NextResponse.json(
      { message: "Password salah" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set(`upload_${uploadId}`, "verified", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 jam
  });

  return NextResponse.json({
    success: true,
  });
}