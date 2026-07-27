"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { SITE, THANK_YOU } from "@/lib/constants";
import { track } from "@/lib/analytics";

const BROCHURE_PATH = "/downloads/darbaar-by-tsar.pdf";
const BROCHURE_FILENAME = "Darbaar-by-tsar.pdf";
const REDIRECT_SECONDS = 5;

function triggerBrochureDownload() {
  const link = document.createElement("a");
  link.href = BROCHURE_PATH;
  link.download = BROCHURE_FILENAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function ThankYouClient({ brochureAvailable }: { brochureAvailable: boolean }) {
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    track("thankyou_view");
  }, []);

  useEffect(() => {
    if (!brochureAvailable) return;
    triggerBrochureDownload();
    track("brochure_download", { source: "auto" });
  }, [brochureAvailable]);

  useEffect(() => {
    if (brochureAvailable || cancelled) return;
    if (seconds <= 0) {
      window.location.href = SITE.parentUrl;
      return;
    }
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [brochureAvailable, cancelled, seconds]);

  return (
    <main className="film-grain flex min-h-[100svh] flex-col items-center justify-center bg-darbaar px-6 py-20 text-center text-ivory">
      <BrandLogo variant="white" size="lg" className="mx-auto" />

      <div className="mt-10 flex size-14 items-center justify-center rounded-full border border-ivory/40">
        <Check className="size-7 text-ivory" strokeWidth={1.75} aria-hidden />
      </div>

      <h1 className="mt-8 max-w-xl font-serif text-[36px] leading-[1.1] tracking-[-0.01em] md:text-[48px]">
        {THANK_YOU.headline}
      </h1>
      <p className="mt-5 max-w-md text-base leading-[1.65] text-ivory/70">
        {THANK_YOU.body}
      </p>

      <div className="mt-10 flex w-full max-w-sm flex-col items-center gap-4">
        {brochureAvailable ? (
          <Button
            type="button"
            className="btn-on-navy w-full"
            showArrow
            onClick={() => {
              track("brochure_download", { source: "button" });
              triggerBrochureDownload();
            }}
          >
            {THANK_YOU.brochureLabel}
          </Button>
        ) : (
          <>
            <p className="text-sm text-ivory/55">{THANK_YOU.redirectNote}</p>
            {!cancelled ? (
              <div className="w-full border border-ivory/15 px-4 py-4 text-sm text-ivory/70">
                <p>
                  Taking you to TSAR Perfumes in{" "}
                  <span className="text-ivory">{seconds}</span>s…
                </p>
                <button
                  type="button"
                  className="mt-3 text-xs uppercase tracking-[0.12em] text-ivory underline-offset-4 hover:underline"
                  onClick={() => setCancelled(true)}
                >
                  Stay on this page
                </button>
              </div>
            ) : null}
          </>
        )}

        <a
          href={SITE.parentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ivory/70 underline-offset-4 hover:underline"
          onClick={() => track("explore_tsar_click")}
        >
          {THANK_YOU.exploreLabel}
        </a>
        <Link
          href="/"
          className="mt-6 text-xs uppercase tracking-[0.12em] text-ivory/80"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
