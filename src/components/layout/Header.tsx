"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-ivory/20 bg-darbaar text-ivory"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="container-site flex h-[70px] items-center justify-between gap-6">
          <Link
            href="/#top"
            className="flex h-10 shrink-0 items-center"
            onClick={closeMenu}
            aria-label={`${SITE.name} home`}
          >
            <BrandLogo
              variant="white"
              size="sm"
              priority
              className="!h-8 !w-[7.75rem] sm:!h-9 sm:!w-[9.5rem]"
            />
          </Link>

          <nav
            className="hidden items-center gap-5 lg:flex xl:gap-[26px]"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-transparent py-1 text-[11.5px] font-medium uppercase tracking-[0.1em] text-ivory/85 transition-colors hover:border-ivory hover:text-ivory xl:text-[12.5px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#enquiry"
              className="hidden items-center justify-center border-[1.5px] border-ivory bg-ivory px-5 py-[11px] text-[11.5px] font-semibold uppercase tracking-[0.1em] text-darbaar transition-colors hover:bg-transparent hover:text-ivory lg:inline-flex"
              onClick={() => track("nav_cta_click", { device: "desktop" })}
            >
              Request a Consultation
            </a>

            <button
              type="button"
              className="tap-target relative flex size-11 items-center justify-center text-ivory lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative block h-3.5 w-6" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-[var(--duration-base)]",
                    menuOpen && "translate-y-[6px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[6px] h-0.5 w-full bg-current transition-opacity duration-[var(--duration-base)]",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[12px] h-0.5 w-full bg-current transition-transform duration-[var(--duration-base)]",
                    menuOpen && "-translate-y-[6px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed inset-x-0 bottom-0 z-40 bg-darbaar-deep lg:hidden"
            style={{ top: "calc(70px + var(--safe-top))" }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="border-b border-ivory/10 px-5 py-4 text-[14px] uppercase tracking-[0.08em] text-ivory sm:px-8"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#enquiry"
                className="px-5 py-4 text-[14px] font-semibold uppercase tracking-[0.08em] text-ivory sm:px-8"
                onClick={() => {
                  track("nav_cta_click", { device: "mobile_menu" });
                  closeMenu();
                }}
              >
                Request a Consultation
              </a>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
