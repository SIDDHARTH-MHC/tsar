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
      const view = window.innerHeight * 0.65;
      const start = view;
      const end = rect.height;
      const raw = (start - rect.top) / end;
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
            className="mb-16"
          />
        </FadeIn>

        <ol ref={ref} className="relative grid gap-10 lg:grid-cols-5 lg:gap-4">
          <div
            className="pointer-events-none absolute left-5 top-5 bottom-5 w-px bg-gold/20 lg:left-0 lg:right-0 lg:top-[22px] lg:bottom-auto lg:h-px lg:w-full"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-5 top-5 w-px origin-top bg-gold lg:left-0 lg:top-[22px] lg:h-px lg:origin-left"
            style={{
              height: undefined,
              transform: `scaleY(${progress})`,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-0 top-[22px] hidden h-px w-full origin-left bg-gold lg:block"
            style={{ transform: `scaleX(${progress})` }}
            aria-hidden
          />

          {HOW_IT_WORKS.steps.map((step, i) => {
            const active = progress >= i / (HOW_IT_WORKS.steps.length - 1) - 0.05;
            return (
              <li
                key={step.number}
                className={cn(
                  "relative pl-14 transition-opacity duration-500 lg:pl-0 lg:pt-14",
                  active ? "opacity-100" : "opacity-40",
                )}
              >
                <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-gold bg-ivory font-serif text-sm text-noir lg:left-1/2 lg:top-0 lg:-translate-x-1/2">
                  {step.number}
                </span>
                <h3 className="font-serif text-2xl text-noir">{step.title}</h3>
                <p className="mt-3 text-sm leading-[1.65] text-charcoal/75">
                  {step.copy}
                </p>
              </li>
            );
          })}
        </ol>

        <FadeIn className="mt-14 flex justify-center">
          <Button href={HOW_IT_WORKS.cta.href} showArrow>
            {HOW_IT_WORKS.cta.label}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
