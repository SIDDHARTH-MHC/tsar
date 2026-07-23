"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const onDark = !scrolled && !menuOpen;

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-base)]",
          scrolled || menuOpen
            ? "border-b border-border bg-ivory/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
          <Link
            href="/"
            className="group relative flex min-h-12 min-w-0 items-center py-1"
            onClick={closeMenu}
            aria-label={`${SITE.name} home`}
          >
            <span className="relative inline-block">
              <BrandLogo
                variant="navy"
                priority
                className={cn(
                  "transition-opacity duration-[var(--duration-base)]",
                  onDark ? "opacity-0" : "opacity-100",
                )}
              />
              <BrandLogo
                variant="white"
                priority
                className={cn(
                  "absolute left-0 top-0 transition-opacity duration-[var(--duration-base)]",
                  onDark ? "opacity-100" : "opacity-0",
                )}
              />
            </span>
          </Link>

          <nav
            className="hidden items-center gap-10 xl:gap-12 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "gold-underline py-2 text-[13px] font-medium tracking-[0.04em] transition-colors",
                  onDark ? "text-ivory/90" : "text-charcoal",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
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
              type="button"
              className={cn(
                "tap-target relative flex size-12 items-center justify-center rounded-[var(--radius-xs)] lg:hidden",
                onDark ? "text-ivory" : "text-navy",
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-[var(--duration-base)]",
                    menuOpen && "translate-y-[7px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[7px] h-px w-full bg-current transition-opacity duration-[var(--duration-base)]",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[14px] h-px w-full bg-current transition-transform duration-[var(--duration-base)]",
                    menuOpen && "-translate-y-[7px] -rotate-45",
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
            className="fixed inset-0 z-40 bg-ivory lg:hidden"
            style={{ paddingTop: "calc(var(--header-h) + var(--safe-top))" }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <m.nav
              className="container-site flex h-full flex-col justify-between pb-[max(2rem,var(--safe-bottom))] pt-8"
              aria-label="Mobile"
              initial={reduce ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href}>
                    <m.a
                      href={link.href}
                      className="flex min-h-14 items-center border-b border-border font-serif text-3xl text-navy"
                      onClick={() => {
                        closeMenu();
                      }}
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.08 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {link.label}
                    </m.a>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <Button
                  href="#enquiry"
                  className="w-full"
                  onClick={() => {
                    track("nav_cta_click", { device: "mobile_menu" });
                    closeMenu();
                  }}
                >
                  Request a Consultation
                </Button>
                <p className="cta-note text-center">
                  Free consultation · No obligation
                </p>
              </div>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
