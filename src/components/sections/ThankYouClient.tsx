"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE, THANK_YOU } from "@/lib/constants";
import { track } from "@/lib/analytics";

const BROCHURE_PATH = "/downloads/TSAR-Darbaar-Company-Profile.pdf";
const REDIRECT_SECONDS = 5;

export function ThankYouClient({ brochureAvailable }: { brochureAvailable: boolean }) {
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    track("thankyou_view");
  }, []);

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
        {brochureAvailable ? (
          <Button
            href={BROCHURE_PATH}
            className="w-full"
            showArrow
            onClick={() => track("brochure_download")}
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
                  <span className="text-gold">{seconds}</span>s…
                </p>
                <button
                  type="button"
                  className="mt-3 text-xs uppercase tracking-[0.12em] text-gold gold-underline"
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
          className="gold-underline text-sm text-ivory/70"
          onClick={() => track("explore_tsar_click")}
        >
          {THANK_YOU.exploreLabel}
        </a>
        <Link
          href="/"
          className="mt-6 text-xs uppercase tracking-[0.12em] text-gold"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
