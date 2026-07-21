"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-base)]",
        scrolled || open
          ? "h-16 border-b border-noir/10 bg-ivory md:h-20"
          : "h-16 bg-transparent md:h-20",
      )}
    >
      <div className="container-site flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex flex-col"
          onClick={() => setOpen(false)}
        >
          <span
            className={cn(
              "font-serif text-2xl lowercase leading-none tracking-tight transition-colors",
              scrolled || open ? "text-noir" : "text-ivory",
            )}
          >
            tsar <span className="text-gold">darbaar</span>
          </span>
          <span
            className={cn(
              "mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors",
              scrolled || open ? "text-charcoal/60" : "text-ivory/60",
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
                "gold-underline text-[13px] font-medium tracking-[0.04em] transition-colors",
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
            className="!py-3 !px-6 text-[12px]"
            onClick={() => track("nav_cta_click", { device: "desktop" })}
          >
            Request a Consultation
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-11 items-center justify-center lg:hidden",
            scrolled || open ? "text-noir" : "text-ivory",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 top-16 z-40 flex flex-col bg-ivory lg:hidden">
          <nav className="flex flex-1 flex-col gap-2 px-6 py-8" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-noir/10 py-4 font-serif text-2xl text-noir"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="border-t border-noir/10 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <Button
              href="#enquiry"
              className="w-full"
              onClick={() => {
                track("nav_cta_click", { device: "mobile" });
                setOpen(false);
              }}
            >
              Request a Consultation
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
