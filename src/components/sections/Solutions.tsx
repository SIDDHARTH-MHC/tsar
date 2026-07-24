"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { ENQUIRY, SOLUTIONS } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function Solutions() {
  return (
    <section
      id={SOLUTIONS.id}
      aria-labelledby="solutions-heading"
      className="section-pad bg-darbaar text-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/70">
            {SOLUTIONS.eyebrow}
          </p>
          <h2
            id="solutions-heading"
            className="font-serif text-section text-balance text-ivory"
          >
            {SOLUTIONS.headline}
          </h2>
          <p className="mt-4 max-w-[46ch] text-lede text-pretty text-ivory/80">
            {SOLUTIONS.lede}
          </p>
        </FadeIn>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
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

        <p className="mt-8 max-w-[60ch] text-[15.5px] text-ivory/80">
          {SOLUTIONS.note}
        </p>
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
        "relative flex h-full flex-col border-t-[3px] px-7 pb-[30px] pt-[34px]",
        featured
          ? "border-t-ivory bg-darbaar-deep text-ivory"
          : "border-t-darbaar bg-ivory text-ink",
      )}
    >
      {plan.badge ? (
        <span
          className={cn(
            "absolute right-0 top-0 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.18em]",
            featured
              ? "bg-ivory text-darbaar-deep"
              : "bg-darbaar text-ivory",
          )}
        >
          {plan.badge}
        </span>
      ) : null}
      <h3 className="font-serif text-[28px] font-semibold leading-[1.1]">
        {plan.name}
      </h3>
      <p
        className={cn(
          "mt-2 text-[15px] leading-[1.5]",
          featured ? "text-ivory/80" : "text-charcoal",
        )}
      >
        {plan.positioning}
      </p>
      <ul
        className={cn(
          "mt-[22px] mb-[26px] flex-1 space-y-[11px] border-t pt-5",
          featured ? "border-ivory/20" : "border-border",
        )}
      >
        {plan.features.map((feature) => (
          <li
            key={feature.text}
            className={cn(
              "relative text-[14.5px] leading-[1.48]",
              feature.head
                ? cn(
                    "pl-0 font-semibold",
                    featured ? "text-ivory" : "text-ink",
                  )
                : cn(
                    "pl-5 before:absolute before:left-0 before:top-[9px] before:h-[1.5px] before:w-[9px]",
                    featured
                      ? "text-ivory/85 before:bg-ivory"
                      : "text-charcoal before:bg-darbaar",
                  ),
            )}
          >
            {feature.text}
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <Button
          href={`/?plan=${encodeURIComponent(plan.cta.planValue)}#enquiry`}
          className={cn("w-full", featured && "btn-on-navy")}
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
