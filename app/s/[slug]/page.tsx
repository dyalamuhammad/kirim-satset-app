import DownloadButton from "@/components/download/download-button";
import { supabaseAdmin } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DownloadPage({ params }: Props) {
  const { slug } = await params;

  const { data: upload } = await supabaseAdmin
    .from("uploads")
    .select("id, slug")
    .eq("slug", slug)
    .single();

  if (!upload) {
    notFound();
  }
  const { data: files } = await supabaseAdmin
  .from("files")
  .select("*")
  .eq("upload_id", upload.id);

  return (
    <main className="container mx-auto max-w-2xl py-10">
  <h1 className="text-3xl font-bold">Download File</h1>

  <div className="mt-6 space-y-3">
    {files?.map((file) => (
      <div
        key={file.id}
        className="flex items-center justify-between rounded-lg border p-4"
      >
        <div>
          <p className="font-medium">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>

        <DownloadButton path={file.storage_path} />
      </div>
    ))}
  </div>
</main>
  );
}