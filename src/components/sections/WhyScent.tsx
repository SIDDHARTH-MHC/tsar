import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { WHY_SCENT } from "@/lib/constants";

export function WhyScent() {
  return (
    <section
      id={WHY_SCENT.id}
      aria-labelledby="why-scent-heading"
      className="section-pad bg-sand"
    >
      <div className="container-site">
        <FadeIn>
          <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
            <div
              className="flex aspect-square items-center justify-center border border-border bg-ivory text-[10.5px] font-semibold uppercase tracking-[0.26em] text-charcoal"
              aria-hidden
            >
              Image
            </div>
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-darbaar">
                {WHY_SCENT.eyebrow}
              </p>
              <p
                id="why-scent-heading"
                className="max-w-[38ch] font-serif text-[clamp(27px,3.1vw,42px)] font-medium leading-[1.22] tracking-[-0.012em] text-ink"
              >
                {WHY_SCENT.feeling}{" "}
                <b className="font-semibold italic text-darbaar">
                  {WHY_SCENT.feelingEmphasis}
                </b>
              </p>
              <p className="feeling-sub mt-5 max-w-[38ch] text-lg leading-[1.5] text-charcoal">
                {WHY_SCENT.sub}
              </p>
              <div className="mt-7">
                <Button href={WHY_SCENT.cta.href} variant="ghost">
                  {WHY_SCENT.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
