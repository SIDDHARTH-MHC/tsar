import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE, THANK_YOU } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank you | TSAR Darbaar",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="film-grain flex min-h-[100svh] flex-col items-center justify-center bg-noir px-6 py-20 text-center text-ivory">
      <p className="font-serif text-2xl lowercase tracking-tight">
        tsar <span className="text-gold">darbaar</span>
      </p>

      <div className="mt-10 flex size-14 items-center justify-center rounded-full border border-gold">
        <Check className="size-7 text-gold" strokeWidth={1.75} aria-hidden />
      </div>

      <h1 className="mt-8 max-w-xl font-serif text-[36px] leading-[1.1] tracking-[-0.01em] md:text-[48px]">
        {THANK_YOU.headline}
      </h1>
      <p className="mt-5 max-w-md text-base leading-[1.65] text-ivory/70">
        {THANK_YOU.body}
      </p>

      <div className="mt-10 flex w-full max-w-sm flex-col items-center gap-4">
        <Button
          href="/downloads/TSAR-Darbaar-Company-Profile.pdf"
          className="w-full"
          showArrow
        >
          {THANK_YOU.brochureLabel}
        </Button>
        <p className="text-xs text-ivory/45">{THANK_YOU.redirectNote}</p>
        <a
          href={SITE.parentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-underline text-sm text-ivory/70"
        >
          {THANK_YOU.exploreLabel}
        </a>
        <Link href="/" className="mt-6 text-xs uppercase tracking-[0.12em] text-gold">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
