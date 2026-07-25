import Image from "next/image";
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
          <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-ivory">
              <Image
                src="/images/why-scent-lobby.jpg"
                alt="Guest welcomed at a hotel lobby reception"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center"
                priority={false}
              />
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
