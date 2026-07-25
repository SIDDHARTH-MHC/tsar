"use client";

import { useReducedMotion, LazyMotion, domAnimation, m } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HERO } from "@/lib/constants";
import { track } from "@/lib/analytics";

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
        id="top"
        className="film-grain relative overflow-hidden bg-darbaar pb-14 pt-[calc(5.25rem+var(--safe-top))] text-ivory sm:pb-20 md:pb-24 md:pt-36"
      >
        <div
          className="plume plume-a pointer-events-none absolute -right-[150px] -top-[220px] size-[620px] rounded-full bg-ivory/[0.085] blur-[70px]"
          aria-hidden
        />
        <div
          className="plume plume-b pointer-events-none absolute -bottom-[250px] -left-[130px] size-[500px] rounded-full bg-darbaar-deep/70 blur-[70px]"
          aria-hidden
        />

        <div className="container-site relative z-10">
          <div className="max-w-3xl lg:max-w-4xl">
            <m.p
              className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/70"
              {...line(0.1)}
            >
              {HERO.eyebrow}
            </m.p>
            <m.h1
              className="max-w-[15ch] font-serif text-display text-balance text-ivory"
              {...line(0.2)}
            >
              {HERO.headline}
              <em className="mt-1 block font-normal italic opacity-90">
                {HERO.headlineItalic}
              </em>
            </m.h1>
            <m.p
              className="mt-6 max-w-2xl text-[clamp(17px,1.6vw,21px)] leading-[1.58] text-pretty text-ivory/85"
              {...line(0.3)}
            >
              {HERO.subheadline}
            </m.p>
            <m.div className="mt-8 sm:mt-10" {...line(0.4)}>
              <Button
                href={HERO.cta.href}
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() =>
                  track("hero_cta_click", {
                    cta_label: HERO.cta.label,
                  })
                }
              >
                {HERO.cta.label}
              </Button>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
