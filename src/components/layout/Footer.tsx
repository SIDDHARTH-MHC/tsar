"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FOOTER, NAV_LINKS, SITE } from "@/lib/constants";
import { track } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="bg-darbaar-deep pb-[30px] pt-[62px] text-ivory">
      <div className="container-site">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.3fr] lg:gap-12">
          <div>
            <BrandLogo variant="white" size="lg" />
            <p className="mt-3.5 max-w-[34ch] text-[14.5px] leading-[1.7] text-ivory/80">
              {FOOTER.tagline}
            </p>
            <p className="mt-[18px] text-[11.5px] uppercase tracking-[0.22em] text-ivory/55">
              {FOOTER.madeIn}
            </p>
          </div>

          <div>
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-ivory/60">
              Explore
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14.5px] text-ivory/80 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-ivory/60">
              Contact
            </p>
            <ul className="space-y-2.5 text-[14.5px] text-ivory/80">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all hover:underline"
                  onClick={() =>
                    track("email_click", { placement: "footer" })
                  }
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.phoneHref}
                  className="hover:underline"
                  onClick={() =>
                    track("phone_click", { placement: "footer" })
                  }
                >
                  {SITE.phone}
                </a>
              </li>
              <li>GSTIN {SITE.gstin}</li>
            </ul>
          </div>
        </div>

        <div className="mt-11 flex flex-col gap-3 border-t border-ivory/15 pt-[22px] text-[12.5px] text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <span>{FOOTER.copyright}</span>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
