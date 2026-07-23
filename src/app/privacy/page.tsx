import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | TSAR Darbaar",
  description: "How TSAR Darbaar collects and uses enquiry information.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-[100svh] bg-ivory text-charcoal">
      <div className="container-site section-pad max-w-3xl">
        <Link href="/" className="inline-flex min-h-12 items-center" aria-label="Home">
          <BrandLogo variant="navy" size="sm" />
        </Link>
        <Link
          href="/"
          className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-gold"
        >
          ← Back to home
        </Link>
        <h1 className="mt-8 font-serif text-[36px] leading-[1.1] text-navy md:text-[48px]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-charcoal/60">Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-base leading-[1.65] text-charcoal/85">
          <section>
            <h2 className="font-serif text-2xl text-noir">Who we are</h2>
            <p className="mt-3">
              TSAR Darbaar is the commercial scenting division of {SITE.parent}.
              This policy covers the darbaar.tsarperfumes.com website and the
              business enquiry form on it.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-noir">
              What we collect
            </h2>
            <p className="mt-3">
              When you submit an enquiry, we collect the details you provide -
              typically your name, company, work email, phone number, and any
              optional information about industry, city, locations, plan
              interest, and message. We may also capture UTM campaign parameters
              and a page URL for attribution.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-noir">How we use it</h2>
            <p className="mt-3">
              We use enquiry details solely to respond to your request, prepare
              a consultation, and improve our service. We do not sell personal
              data. We do not send marketing spam.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-noir">Sharing</h2>
            <p className="mt-3">
              Enquiry data may be processed by infrastructure providers we use
              to operate the site (for example email delivery, hosting, and
              analytics). Access is limited to people who need it to respond to
              your enquiry.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-noir">Retention</h2>
            <p className="mt-3">
              We retain enquiry records for as long as needed to manage the
              relationship and meet legitimate business or legal requirements,
              then delete or anonymise them.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-noir">Your choices</h2>
            <p className="mt-3">
              To access, correct, or request deletion of your enquiry data,
              email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold gold-underline"
              >
                {SITE.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-noir">Contact</h2>
            <p className="mt-3">
              {SITE.name}
              <br />
              A division of {SITE.parent}
              <br />
              {SITE.address}
              <br />
              <a
                href={SITE.phoneHref}
                className="text-gold gold-underline"
              >
                {SITE.phone}
              </a>
              <br />
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold gold-underline"
              >
                {SITE.email}
              </a>
              <br />
              GSTIN {SITE.gstin}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
