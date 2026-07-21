import { ArrowDown } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { WHY_SCENT } from "@/lib/constants";

export function WhyScent() {
  return (
    <section
      id={WHY_SCENT.id}
      aria-labelledby="why-scent-heading"
      className="section-pad bg-white"
    >
      <div className="container-site">
        <FadeIn>
          <p
            id="why-scent-heading"
            className="mx-auto max-w-4xl text-center font-serif text-section text-balance text-navy"
          >
            {WHY_SCENT.editorial}
          </p>
        </FadeIn>

        <div
          className="my-8 h-36 w-full overflow-hidden bg-gradient-to-r from-sand via-champagne to-sand sm:my-12 sm:h-44 md:my-14 md:h-52"
          aria-hidden
          role="presentation"
        >
              <div className="h-full w-full scale-105 bg-gradient-to-r from-champagne/50 via-champagne to-champagne/50" />
        </div>

        <div className="grid gap-8 sm:gap-9 md:grid-cols-3 md:gap-8">
          {WHY_SCENT.columns.map((col, i) => (
            <FadeIn key={col.title} delay={i * 0.08}>
              <div className="border-t border-gold/40 pt-5 sm:pt-6">
                <h3 className="font-sans text-base font-semibold leading-snug text-navy sm:text-lg">
                  {col.title}
                </h3>
                <p className="mt-3 text-lede text-pretty text-charcoal">
                  {col.copy}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 text-center sm:mt-10">
          <a
            href={WHY_SCENT.cta.href}
            className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-gold gold-underline"
          >
            {WHY_SCENT.cta.label}
            <ArrowDown className="size-[18px]" strokeWidth={1.5} aria-hidden />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
