import { ArrowDown } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { WHY_SCENT } from "@/lib/constants";

export function WhyScent() {
  return (
    <section
      id={WHY_SCENT.id}
      aria-labelledby="why-scent-heading"
      className="section-pad bg-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <p
            id="why-scent-heading"
            className="mx-auto max-w-4xl text-center font-serif text-section text-balance text-noir"
          >
            {WHY_SCENT.editorial}
          </p>
        </FadeIn>

        <div
          className="my-10 h-28 w-full bg-gradient-to-r from-sand via-[#d9cbb4] to-sand sm:my-14 sm:h-40 md:my-20 md:h-56"
          aria-hidden
          role="presentation"
        />

        <div className="grid gap-8 sm:gap-10 md:grid-cols-3 md:gap-8">
          {WHY_SCENT.columns.map((col, i) => (
            <FadeIn key={col.title} delay={i * 0.08}>
              <div className="border-t border-gold/40 pt-5 sm:pt-6">
                <h3 className="font-sans text-base font-semibold text-noir sm:text-lg">
                  {col.title}
                </h3>
                <p className="mt-3 text-lede text-pretty text-charcoal/80">
                  {col.copy}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center sm:mt-12">
          <a
            href={WHY_SCENT.cta.href}
            className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-gold gold-underline"
          >
            {WHY_SCENT.cta.label}
            <ArrowDown className="size-4" aria-hidden />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
