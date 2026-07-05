"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "../ui/button";

type Props = {
  value: string;
};

export default function ShareQrCode({ value }: Props) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: 220,
      margin: 2,
    }).then(setQr);
  }, [value]);

  if (!qr) return null;

  return (
    <>
    <img
      src={qr}
      alt="QR Code"
      className="mx-auto rounded-lg border"
      />

    <Button
  variant="outline"
  className="mt-4 w-full"
  onClick={() => {
    const a = document.createElement("a");
    a.href = qr;
    a.download = "KirimSatSet-QR.png";
    a.click();
  }}
>
  Download QR
</Button>
  </>
  );
}