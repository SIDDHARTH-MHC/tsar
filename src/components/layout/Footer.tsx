import { FOOTER, NAV_LINKS, SITE } from "@/lib/constants";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 10v7M7.5 7.5v.01M11 17v-4.2c0-1.6 1.3-2.3 2.5-2.3 1.1 0 2 .6 2 2.3V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="film-grain bg-noir text-ivory">
      <div className="container-site section-pad !pb-12 !pt-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-3xl lowercase tracking-tight">
              tsar <span className="text-gold">darbaar</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
              {FOOTER.tagline}
            </p>
            <p className="mt-3 text-sm text-ivory/55">
              <a
                href={SITE.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-underline text-ivory/80"
              >
                {FOOTER.division}
              </a>
            </p>
          </div>

          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              Explore
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="gold-underline text-sm text-ivory/75"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#enquiry"
                  className="gold-underline text-sm text-ivory/75"
                >
                  Request a Consultation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-ivory/75">
              <li>
                <a href={`mailto:${SITE.email}`} className="gold-underline">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className="gold-underline">
                  {SITE.phone}
                </a>
              </li>
              <li>{SITE.city}</li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-ivory/70 transition-colors hover:text-gold"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-ivory/70 transition-colors hover:text-gold"
              >
                <LinkedInIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.parent}</p>
          <div className="flex items-center gap-6">
            <button type="button" className="gold-underline text-ivory/55">
              Privacy Policy
            </button>
            <span className="tracking-[0.08em]">{FOOTER.madeIn}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
