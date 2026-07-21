"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOW_IT_WORKS } from "@/lib/constants";
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
            className="mb-12 sm:mb-16"
          />
        </FadeIn>

        <ol ref={ref} className="relative grid gap-8 sm:gap-10 lg:grid-cols-5 lg:gap-4">
          {/* Mobile vertical track */}
          <div
            className="pointer-events-none absolute left-5 top-5 bottom-5 w-px bg-gold/20 lg:hidden"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-5 top-5 bottom-5 w-px origin-top bg-gold lg:hidden"
            style={{ transform: `scaleY(${progress})` }}
            aria-hidden
          />
          {/* Desktop horizontal track */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px bg-gold/20 lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-0 top-[22px] hidden h-px w-full origin-left bg-gold lg:block"
            style={{ transform: `scaleX(${progress})` }}
            aria-hidden
          />

          {HOW_IT_WORKS.steps.map((step, i) => {
            const active =
              progress >= i / Math.max(HOW_IT_WORKS.steps.length - 1, 1) - 0.05;
            return (
              <li
                key={step.number}
                className={cn(
                  "relative pl-14 transition-opacity duration-500 lg:pl-0 lg:pt-14",
                  active ? "opacity-100" : "opacity-45",
                )}
              >
                <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-gold bg-ivory font-serif text-sm text-noir lg:left-1/2 lg:top-0 lg:-translate-x-1/2">
                  {step.number}
                </span>
                <h3 className="font-serif text-xl text-noir sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.65] text-pretty text-charcoal/75 sm:mt-3">
                  {step.copy}
                </p>
              </li>
            );
          })}
        </ol>

        <FadeIn className="mt-12 flex justify-center sm:mt-14">
          <Button href={HOW_IT_WORKS.cta.href} showArrow className="w-full max-w-sm sm:w-auto">
            {HOW_IT_WORKS.cta.label}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
