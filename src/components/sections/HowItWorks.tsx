"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ENQUIRY, HOW_IT_WORKS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight * 0.7;
      const raw = (view - rect.top) / Math.max(rect.height, 1);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id={HOW_IT_WORKS.id}
      aria-labelledby="how-it-works-heading"
      className="section-pad bg-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <SectionHeading
            id="how-it-works-heading"
            title={HOW_IT_WORKS.headline}
            align="center"
            className="mb-10 sm:mb-14"
          />
        </FadeIn>

        <ol
          ref={ref}
          className="relative grid gap-9 sm:gap-10 lg:grid-cols-5 lg:gap-5"
        >
          <div
            className="pointer-events-none absolute left-6 top-6 bottom-6 w-px bg-gold/20 lg:hidden"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-6 top-6 bottom-6 w-px origin-top bg-gold transition-transform duration-300 ease-out lg:hidden"
            style={{ transform: `scaleY(${progress})` }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-gold/20 lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-0 top-[26px] hidden h-px w-full origin-left bg-gold transition-transform duration-300 ease-out lg:block"
            style={{ transform: `scaleX(${progress})` }}
            aria-hidden
          />

          {HOW_IT_WORKS.steps.map((step, i) => {
            const threshold =
              i / Math.max(HOW_IT_WORKS.steps.length - 1, 1) - 0.05;
            const active = progress >= threshold;
            return (
              <FadeIn key={step.number} delay={i * 0.07} as="li">
                <div
                  className={cn(
                    "relative pl-16 transition-[opacity,transform] duration-500 lg:pl-0 lg:pt-16",
                    active ? "opacity-100" : "opacity-40",
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border bg-ivory font-serif text-base text-ink transition-all duration-[var(--duration-base)] lg:left-1/2 lg:top-0 lg:-translate-x-1/2",
                      active
                        ? "border-darbaar scale-105 shadow-[0_0_0_4px_rgba(143,20,37,0.16)]"
                        : "border-darbaar/40",
                    )}
                  >
                    {step.number}
                  </span>
                  <h3 className="font-serif text-xl text-ink sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.7] text-pretty text-charcoal sm:mt-3">
                    {step.copy}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </ol>

        <FadeIn className="mt-10 flex flex-col items-center sm:mt-12">
          <Button
            href={HOW_IT_WORKS.cta.href}
            showArrow
            className="w-full max-w-sm sm:w-auto"
          >
            {HOW_IT_WORKS.cta.label}
          </Button>
          <p className="cta-note text-center">{ENQUIRY.ctaNote}</p>
        </FadeIn>
      </div>
    </section>
  );
}
