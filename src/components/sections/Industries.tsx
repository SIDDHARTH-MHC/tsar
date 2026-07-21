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

        <ul className="mt-12 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.cards.map((card, i) => (
            <FadeIn key={card.industry} delay={i * 0.06} as="li">
              <IndustryCard {...card} />
            </FadeIn>
          ))}
        </ul>

        <div className="mt-10 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:hidden">
          {INDUSTRIES.cards.map((card) => (
            <div
              key={card.industry}
              className="w-[78%] shrink-0 snap-start sm:w-[60%]"
            >
              <IndustryCard {...card} />
            </div>
          ))}
        </div>

        <FadeIn className="mt-12 max-w-2xl">
          <p className="text-sm leading-relaxed text-charcoal/75">
            {INDUSTRIES.specifierLine}{" "}
            <a
              href={INDUSTRIES.specifierCta.href}
              className="font-semibold text-gold gold-underline"
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
}: {
  industry: string;
  outcome: string;
  line: string;
  tone: string;
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
        className={`absolute inset-0 bg-gradient-to-br ${tone} transition-transform duration-[var(--duration-ambient)] ease-out group-hover:scale-[1.04]`}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
          {outcome}
        </p>
        <h3 className="mt-2 font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ivory">
          {industry}
        </h3>
        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-ivory/80 opacity-0 transition-all duration-[var(--duration-base)] ease-out group-hover:max-h-24 group-hover:opacity-100 group-focus-within:max-h-24 group-focus-within:opacity-100">
          {line}
        </p>
      </div>
    </article>
  );
}
