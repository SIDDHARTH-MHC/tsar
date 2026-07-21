import type { Metadata } from "next";
import { existsSync } from "fs";
import path from "path";
import { ThankYouClient } from "@/components/sections/ThankYouClient";

export const metadata: Metadata = {
  title: "Thank you | TSAR Darbaar",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  const brochurePath = path.join(
    process.cwd(),
    "public",
    "downloads",
    "TSAR-Darbaar-Company-Profile.pdf",
  );
  const brochureAvailable = existsSync(brochurePath);

  return <ThankYouClient brochureAvailable={brochureAvailable} />;
}
