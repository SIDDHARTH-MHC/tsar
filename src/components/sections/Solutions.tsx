"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ENQUIRY, SOLUTIONS } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function Solutions() {
  return (
    <section
      id={SOLUTIONS.id}
      aria-labelledby="solutions-heading"
      className="section-pad bg-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <h2
              id="solutions-heading"
              className="font-serif text-section text-balance text-navy"
            >
              {SOLUTIONS.manifesto.headline}
            </h2>
            {SOLUTIONS.manifesto.lines.map((line) => (
              <p
                key={line}
                className="mx-auto mt-5 max-w-2xl text-base leading-[1.72] text-charcoal md:text-lg"
              >
                {line}
              </p>
            ))}
          </div>
        </FadeIn>

        <div id="plans" className="mt-14 scroll-mt-28 sm:mt-16">
          <FadeIn>
            <SectionHeading
              title={SOLUTIONS.plansHeader.headline}
              lede={SOLUTIONS.plansHeader.lede}
              align="center"
              className="mb-10 sm:mb-12"
            />
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {SOLUTIONS.plans.map((plan, i) => (
              <FadeIn
                key={plan.id}
                delay={i * 0.08}
                className={cn(
                  "h-full",
                  plan.featured && "order-first lg:order-none",
                )}
              >
                <PlanCard plan={plan} />
              </FadeIn>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-charcoal/80">
            {SOLUTIONS.note}
          </p>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
}: {
  plan: (typeof SOLUTIONS.plans)[number];
}) {
  const featured = plan.featured;

  return (
    <article
      className={cn(
        "flex h-full flex-col border p-5 transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-luxury)] hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:p-7 md:p-8",
        featured
          ? "border-gold border-t-[3px] bg-navy text-ivory lg:-my-3 lg:py-10"
          : "border-border bg-ivory",
      )}
    >
      {plan.badge ? (
        <Badge
          className={cn(
            "mb-4 self-start",
            featured && "border-gold/40 bg-gold/15 text-gold",
          )}
        >
          {plan.badge}
        </Badge>
      ) : (
        <div className="mb-4 h-[26px]" aria-hidden />
      )}
      <h3
        className={cn(
          "font-serif text-3xl",
          featured ? "text-ivory" : "text-navy",
        )}
      >
        {plan.name}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm italic leading-relaxed",
          featured ? "text-ivory/70" : "text-charcoal",
        )}
      >
        {plan.positioning}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={cn(
              "flex gap-3 text-sm leading-[1.7]",
              featured ? "text-ivory/80" : "text-charcoal",
            )}
          >
            <Check
              className="mt-0.5 size-[18px] shrink-0 text-gold"
              strokeWidth={1.5}
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button
          href={`/?plan=${encodeURIComponent(plan.cta.planValue)}#enquiry`}
          className={cn("w-full", featured && "btn-on-navy")}
          showArrow
          onClick={() => track("plan_cta_click", { plan: plan.cta.planValue })}
        >
          {plan.cta.label}
        </Button>
        <p
          className={cn(
            "cta-note text-center",
            featured && "cta-note-on-dark",
          )}
        >
          {ENQUIRY.ctaNote}
        </p>
      </div>
    </article>
  );
}
