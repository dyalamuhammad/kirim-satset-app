"use client";

import { getDownloadUrl } from "@/app/actions/download";
import { Button } from "@/components/ui/button";

type Props = {
  path: string;
};

export default function DownloadButton({ path }: Props) {
  const handleDownload = async () => {
    const url = await getDownloadUrl(path);

    window.location.href = url;
  };

  return <Button onClick={handleDownload}>Download</Button>;
}