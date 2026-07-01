import { Download, FileText, FolderOpen } from "lucide-react";
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

  const totalSize =
    files?.reduce((acc, file) => acc + file.size, 0) ?? 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border bg-card shadow-xl">
          {/* Header */}
          <div className="border-b p-8">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-4">
                <FolderOpen className="h-8 w-8 text-primary" />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  Download Files
                </h1>

                <p className="mt-1 text-muted-foreground">
                  {files?.length ?? 0} File •{" "}
                  {(totalSize / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>

          {/* Files */}
          <div className="p-6 space-y-4">
            {files?.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-xl border bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <p className="font-semibold">{file.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <DownloadButton path={file.storage_path} />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Kirim Satset • Fast & Secure File Sharing
        </p>
      </div>
    </main>
  );
}