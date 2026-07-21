"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/constants";
import { track } from "@/lib/analytics";

export function Industries() {
  return (
    <section
      id={INDUSTRIES.id}
      aria-labelledby="industries-heading"
      className="section-pad bg-sand"
    >
      <div className="container-site">
        <FadeIn>
          <SectionHeading
            id="industries-heading"
            title={INDUSTRIES.headline}
            lede={INDUSTRIES.lede}
          />
        </FadeIn>

        <ul className="mt-10 hidden gap-4 md:mt-12 md:grid md:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.cards.map((card, i) => (
            <FadeIn key={card.industry} delay={i * 0.06} as="li">
              <IndustryCard {...card} revealAlways={false} />
            </FadeIn>
          ))}
        </ul>

        <div className="relative mt-8 md:hidden">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal/45">
            Swipe to explore
          </p>
          <div className="snap-carousel -mx-4 px-4 sm:-mx-5 sm:px-5">
            {INDUSTRIES.cards.map((card) => (
              <div
                key={card.industry}
                className="w-[min(78vw,300px)] sm:w-[min(60vw,340px)]"
              >
                <IndustryCard {...card} revealAlways />
              </div>
            ))}
          </div>
        </div>

        <FadeIn className="mt-10 max-w-2xl sm:mt-12">
          <p className="text-sm leading-relaxed text-pretty text-charcoal/75">
            {INDUSTRIES.specifierLine}{" "}
            <a
              href={INDUSTRIES.specifierCta.href}
              className="inline-flex min-h-11 items-center font-semibold text-gold gold-underline"
            >
              {INDUSTRIES.specifierCta.label} →
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function IndustryCard({
  industry,
  outcome,
  line,
  tone,
  revealAlways,
}: {
  industry: string;
  outcome: string;
  line: string;
  tone: string;
  revealAlways: boolean;
}) {
  return (
    <article
      className="group relative aspect-[3/4] overflow-hidden bg-noir"
      tabIndex={0}
      onClick={() => track("industry_card_click", { industry })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          track("industry_card_click", { industry });
        }
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${tone} md:transition-transform md:duration-[var(--duration-ambient)] md:ease-out md:group-hover:scale-[1.04]`}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-noir via-noir/45 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gold sm:text-[11px] sm:tracking-[0.14em]">
          {outcome}
        </p>
        <h3 className="mt-2 font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-ivory sm:text-sm sm:tracking-[0.08em]">
          {industry}
        </h3>
        <p
          className={
            revealAlways
              ? "mt-3 text-sm leading-relaxed text-ivory/80"
              : "mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-ivory/80 opacity-0 transition-all duration-[var(--duration-base)] ease-out group-hover:max-h-24 group-hover:opacity-100 group-focus-within:max-h-24 group-focus-within:opacity-100"
          }
        >
          {line}
        </p>
      </div>
    </article>
  );
}
