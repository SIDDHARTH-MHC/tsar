import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="film-grain flex min-h-[100svh] flex-col items-center justify-center bg-navy px-6 py-20 text-center text-ivory">
      <p className="font-serif text-2xl lowercase tracking-tight">
        tsar <span className="text-gold">darbaar</span>
      </p>
      <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-gold">
        404
      </p>
      <h1 className="mt-4 max-w-lg font-serif text-[36px] leading-[1.1] tracking-[-0.01em] md:text-[48px]">
        This page has drifted out of scent range.
      </h1>
      <p className="mt-5 max-w-md text-base leading-[1.65] text-ivory/70">
        The link may be outdated, or the page never existed. Return home to
        continue your scent story.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/" className="btn-on-navy">
          Back to home
        </Button>
        <Button href="/#enquiry" variant="secondary">
          Request a Consultation
        </Button>
      </div>
      <Link
        href="/"
        className="mt-8 text-xs uppercase tracking-[0.12em] text-gold"
      >
        TSAR Darbaar
      </Link>
    </main>
  );
}
