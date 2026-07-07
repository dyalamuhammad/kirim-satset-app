import { Download, FileText, FolderOpen } from "lucide-react";
import DownloadButton from "@/components/download/download-button";
import { supabaseAdmin } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PasswordGate from "@/components/download/password-gate";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DownloadPage({ params }: Props) {
  const { slug } = await params;

  const { data: upload } = await supabaseAdmin
    .from("uploads")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!upload) {
    notFound();
  }

  const { data: files } = await supabaseAdmin
    .from("files")
    .select("*")
    .eq("upload_id", upload.id);

    if (upload.is_deleted) {
  return (
    <div className="mx-auto mt-20 max-w-lg text-center">
      <h1 className="text-2xl font-bold">
        File tidak tersedia
      </h1>

      <p className="mt-2 text-muted-foreground">
        File ini sudah tidak dapat diakses.
      </p>
    </div>
  );
}

  const totalSize =
    files?.reduce((acc, file) => acc + file.size, 0) ?? 0;

    const cookieStore = await cookies();

const verified =
  cookieStore.get(`upload_${upload.id}`)?.value === "verified";

  if (upload.password_hash && !verified) {
    return <PasswordGate uploadId={upload.id} />;
  }

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
                className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between rounded-xl border bg-background p-1 sm:p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex w-full items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate w-full text-xs sm:text-base">{file.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <DownloadButton 
                  path={file.storage_path} 
                  uploadId={upload.id}
                  deleteAfterFirstDownload={upload.delete_after_first_download}
                />
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