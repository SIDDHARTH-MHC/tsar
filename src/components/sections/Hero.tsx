"use client";

import { useReducedMotion, LazyMotion, domAnimation, m } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HERO, LEGACY } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { FlaskConical, Leaf, Library, ShieldCheck } from "lucide-react";

const icons = [FlaskConical, Library, Leaf, ShieldCheck];

export function Hero() {
  const reduce = useReducedMotion();

  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="hero"
        className="film-grain relative flex min-h-[100svh] items-end overflow-hidden bg-noir"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#2a241c_0%,transparent_55%),linear-gradient(160deg,#121112_0%,#1a1612_45%,#0e0d0c_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30 md:opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(176,141,87,0.18), transparent 40%)",
          }}
          aria-hidden
        />

        <div className="container-site relative z-10 w-full pb-16 pt-[calc(5.5rem+var(--safe-top))] sm:pb-20 md:pb-28 md:pt-40">
          <div className="max-w-3xl lg:max-w-4xl">
            <m.p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold sm:mb-5 sm:text-[13px]"
              {...line(0.1)}
            >
              {HERO.eyebrow}
            </m.p>
            <m.h1
              className="font-serif text-display text-balance text-ivory"
              {...line(0.2)}
            >
              {HERO.headline}
            </m.h1>
            <m.p
              className="mt-5 max-w-2xl text-lede text-pretty text-ivory/75 sm:mt-6"
              {...line(0.3)}
            >
              {HERO.subheadline}
            </m.p>
            <m.div
              className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row"
              {...line(0.4)}
            >
              <Button
                href={HERO.primaryCta.href}
                className="w-full sm:w-auto"
                onClick={() =>
                  track("hero_cta_click", { cta_label: HERO.primaryCta.label })
                }
              >
                {HERO.primaryCta.label}
              </Button>
              <Button
                href={HERO.secondaryCta.href}
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() =>
                  track("hero_cta_click", {
                    cta_label: HERO.secondaryCta.label,
                  })
                }
              >
                {HERO.secondaryCta.label}
              </Button>
            </m.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:bottom-8 md:block">
          <div className="scroll-cue" aria-hidden />
        </div>
      </section>

      <div className="border-b border-noir/10 bg-ivory">
        <div className="container-site py-8 sm:py-10 md:py-12">
          <div className="mx-auto flex max-w-3xl items-center gap-4">
            <span className="hidden h-px flex-1 bg-gold/50 sm:block" />
            <p className="text-center font-serif text-[15px] italic leading-snug text-balance text-charcoal/85 sm:text-base md:text-lg">
              {LEGACY.bandLine}
            </p>
            <span className="hidden h-px flex-1 bg-gold/50 sm:block" />
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {LEGACY.credentials.map((item, i) => {
              const Icon = icons[i];
              return (
                <li key={item.title} className="flex gap-3">
                  <Icon
                    className="mt-0.5 size-5 shrink-0 text-gold"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-noir">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
                      {item.copy}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </LazyMotion>
  );
}
