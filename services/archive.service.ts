export async function triggerArchive(uploadId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-archive`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        uploadId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to trigger archive");
  }

  return response.json();
}