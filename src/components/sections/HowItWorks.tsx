"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { HOW_IT_WORKS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = HOW_IT_WORKS.steps[active];
  const fillWidth =
    (active / Math.max(HOW_IT_WORKS.steps.length - 1, 1)) * 88;

  return (
    <section
      id={HOW_IT_WORKS.id}
      aria-labelledby="process-heading"
      className="section-pad bg-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-darbaar">
            {HOW_IT_WORKS.eyebrow}
          </p>
          <h2
            id="process-heading"
            className="font-serif text-section text-balance text-ink"
          >
            {HOW_IT_WORKS.headline}
          </h2>
        </FadeIn>

        <FadeIn className="relative mt-10">
          <div
            className="pointer-events-none absolute left-[6%] right-[6%] top-[27px] hidden h-px bg-border lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-[6%] top-[27px] hidden h-0.5 bg-darbaar transition-[width] duration-[450ms] ease-out lg:block"
            style={{ width: `${fillWidth}%` }}
            aria-hidden
          />

          <div
            className="relative z-[2] flex overflow-x-auto scrollbar-none"
            role="tablist"
            aria-label="Process steps"
          >
            {HOW_IT_WORKS.steps.map((s, i) => {
              const on = i <= active;
              return (
                <button
                  key={s.number}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className="min-w-[96px] flex-1 cursor-pointer bg-transparent text-center"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span
                    className={cn(
                      "mx-auto flex size-[54px] items-center justify-center rounded-full border-[1.5px] bg-ivory font-sans text-[15px] font-bold tabular-nums transition-[background-color,color,border-color,transform] duration-300",
                      on
                        ? "scale-[1.09] border-darbaar bg-darbaar text-ivory"
                        : "border-border text-charcoal",
                    )}
                  >
                    {s.number}
                  </span>
                  <span
                    className={cn(
                      "mt-3.5 block font-serif text-[17px] font-semibold transition-colors duration-300",
                      on ? "text-ink" : "text-charcoal",
                    )}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-[34px] grid grid-cols-1 items-start gap-3 border-t border-border pt-[26px] sm:grid-cols-[auto_1fr] sm:gap-[26px]">
            <p
              className="font-sans text-[44px] font-bold leading-[0.9] tracking-[-0.035em] text-darbaar/20 tabular-nums"
              aria-hidden
            >
              {step.number}
            </p>
            <p className="max-w-[70ch] text-[17.5px] leading-[1.6] text-charcoal">
              <b className="font-semibold text-ink">{step.title}.</b> {step.copy}
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-8">
          <Button href={HOW_IT_WORKS.cta.href}>
            {HOW_IT_WORKS.cta.label}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
