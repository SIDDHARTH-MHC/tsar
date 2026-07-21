"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-base)]",
        scrolled || open
          ? "border-b border-noir/10 bg-ivory/95 backdrop-blur-md"
          : "bg-transparent",
      )}
      style={{ paddingTop: "var(--safe-top)" }}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="group flex min-w-0 flex-col py-1"
          onClick={() => setOpen(false)}
        >
          <span
            className={cn(
              "font-serif text-[22px] lowercase leading-none tracking-tight transition-colors sm:text-2xl",
              scrolled || open ? "text-noir" : "text-ivory",
            )}
          >
            tsar <span className="text-gold">darbaar</span>
          </span>
          <span
            className={cn(
              "mt-1 truncate text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-[10px] sm:tracking-[0.16em]",
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

        <button
          ref={closeRef}
          type="button"
          className={cn(
            "tap-target inline-flex items-center justify-center lg:hidden",
            scrolled || open ? "text-noir" : "text-ivory",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <div
          id={menuId}
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-ivory lg:hidden"
          style={{ top: "calc(64px + var(--safe-top))" }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav
            className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-5 py-6"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="min-h-14 border-b border-noir/10 py-4 font-serif text-[26px] leading-tight text-noir sm:text-3xl"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div
            className="border-t border-noir/10 p-5"
            style={{ paddingBottom: "max(1.25rem, var(--safe-bottom))" }}
          >
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
