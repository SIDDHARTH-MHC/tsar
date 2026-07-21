"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-base)]",
        scrolled
          ? "border-b border-noir/10 bg-ivory/95 backdrop-blur-md"
          : "bg-transparent",
      )}
      style={{ paddingTop: "var(--safe-top)" }}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="group flex min-w-0 flex-col py-1">
          <span
            className={cn(
              "font-serif text-[22px] lowercase leading-none tracking-tight transition-colors sm:text-2xl",
              scrolled ? "text-noir" : "text-ivory",
            )}
          >
            tsar <span className="text-gold">darbaar</span>
          </span>
          <span
            className={cn(
              "mt-1 truncate text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-[10px] sm:tracking-[0.16em]",
              scrolled ? "text-charcoal/60" : "text-ivory/60",
            )}
          >
            by {SITE.parent}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "gold-underline py-2 text-[13px] font-medium tracking-[0.04em] transition-colors",
                scrolled ? "text-charcoal" : "text-ivory/90",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            href="#enquiry"
            variant="primary"
            className="!px-6 !py-3 text-[12px]"
            onClick={() => track("nav_cta_click", { device: "desktop" })}
          >
            Request a Consultation
          </Button>
        </div>
      </div>
    </header>
  );
}
