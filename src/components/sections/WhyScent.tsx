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
            className="mx-auto max-w-4xl text-center font-serif text-[28px] leading-[1.2] tracking-[-0.01em] text-noir md:text-[40px] lg:text-[48px]"
          >
            {WHY_SCENT.editorial}
          </p>
        </FadeIn>

        <div
          className="my-14 h-40 w-full bg-gradient-to-r from-sand via-[#d9cbb4] to-sand md:my-20 md:h-56"
          aria-hidden
          role="presentation"
        />

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {WHY_SCENT.columns.map((col, i) => (
            <FadeIn key={col.title} delay={i * 0.08}>
              <div className="border-t border-gold/40 pt-6">
                <h3 className="font-sans text-lg font-semibold text-noir">
                  {col.title}
                </h3>
                <p className="mt-3 text-base leading-[1.65] text-charcoal/80">
                  {col.copy}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <a
            href={WHY_SCENT.cta.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold gold-underline"
          >
            {WHY_SCENT.cta.label}
            <ArrowDown className="size-4" aria-hidden />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
