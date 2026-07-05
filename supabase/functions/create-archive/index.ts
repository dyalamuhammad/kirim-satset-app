import { createClient } from "jsr:@supabase/supabase-js@2";
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { uploadId } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase
    .from("archives")
    .update({
      status: "PROCESSING",
      started_at: new Date().toISOString(),
    })
    .eq("upload_id", uploadId);

  if (error) {
    return new Response(error.message, {
      status: 500,
    });
  }

  return Response.json({
    success: true,
  });
});