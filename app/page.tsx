import Intro from "@/components/intro";
import { Card } from "@/components/ui/card";
import UploadDropzone from "@/components/upload/upload-dropzone";

export default function Home() {
  return (
    <Intro>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-5xl font-bold">KirimSatSet 🚀</h1>
            <p className="text-muted-foreground">
              Secepat namanya.
            </p>
          </div>

          <Card className="rounded-2xl p-8">
            <UploadDropzone />
          </Card>

          <div className="text-muted-foreground text-center text-sm">
            Maksimal ukuran file 2 GB
          </div>
        </div>
      </main>
    </Intro>
  );
}