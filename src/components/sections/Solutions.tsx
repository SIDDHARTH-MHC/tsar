"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SOLUTIONS } from "@/lib/constants";
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
              className="font-serif text-[28px] leading-[1.15] tracking-[-0.01em] text-noir md:text-[40px] lg:text-[48px]"
            >
              {SOLUTIONS.manifesto.headline}
            </h2>
            {SOLUTIONS.manifesto.lines.map((line) => (
              <p
                key={line}
                className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-charcoal/80 md:text-lg"
              >
                {line}
              </p>
            ))}
          </div>
        </FadeIn>

        <div id="plans" className="mt-20 scroll-mt-28">
          <FadeIn>
            <SectionHeading
              title={SOLUTIONS.plansHeader.headline}
              lede={SOLUTIONS.plansHeader.lede}
              align="center"
              className="mb-12"
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

          <p className="mt-8 text-center text-sm text-charcoal/65">
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
  return (
    <article
      className={cn(
        "flex h-full flex-col border bg-ivory p-7 transition-shadow duration-[var(--duration-base)] hover:shadow-[var(--shadow-hover)] md:p-8",
        plan.featured
          ? "border-gold border-t-[3px] lg:-my-3 lg:py-10"
          : "border-noir/10",
      )}
    >
      {plan.badge ? (
        <Badge className="mb-4 self-start">{plan.badge}</Badge>
      ) : (
        <div className="mb-4 h-[26px]" aria-hidden />
      )}
      <h3 className="font-serif text-3xl text-noir">{plan.name}</h3>
      <p className="mt-2 text-sm italic leading-relaxed text-charcoal/70">
        {plan.positioning}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-relaxed text-charcoal/85">
            <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href={`/?plan=${encodeURIComponent(plan.cta.planValue)}#enquiry`}
        className="mt-8 w-full"
        showArrow
        onClick={() => track("plan_cta_click", { plan: plan.cta.planValue })}
      >
        {plan.cta.label}
      </Button>
    </article>
  );
}
