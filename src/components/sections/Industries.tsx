"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { INDUSTRIES } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function Industries() {
  const row1 = INDUSTRIES.cards.slice(0, 4);
  const row2 = INDUSTRIES.cards.slice(4);

  return (
    <section
      id={INDUSTRIES.id}
      aria-labelledby="industries-heading"
      className="section-pad bg-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-darbaar">
            {INDUSTRIES.eyebrow}
          </p>
          <h2
            id="industries-heading"
            className="font-serif text-section text-balance text-ink"
          >
            {INDUSTRIES.headline}
          </h2>
          <p className="mt-4 text-lede text-pretty text-charcoal">
            {INDUSTRIES.lede}
          </p>
        </FadeIn>

        <div className="mt-9 hidden flex-col gap-3.5 md:flex">
          {[row1, row2].map((row, rowIndex) => (
            <div key={rowIndex} className="flex h-[260px] gap-3.5">
              {row.map((card) => (
                <IndustryPanel key={card.industry} {...card} />
              ))}
            </div>
          ))}
        </div>

        <div className="relative mt-7 md:hidden">
          <div className="flex flex-col gap-3.5">
            {INDUSTRIES.cards.map((card) => (
              <IndustryPanel key={card.industry} {...card} mobile />
            ))}
          </div>
        </div>

        <FadeIn className="mt-9 border-t border-border pt-[22px]">
          <p className="text-[15.5px] leading-[1.7] text-pretty text-charcoal">
            {INDUSTRIES.specifierLine}{" "}
            <a
              href={INDUSTRIES.specifierCta.href}
              className="font-semibold text-darbaar underline decoration-darbaar/35 underline-offset-2"
            >
              {INDUSTRIES.specifierCta.label}
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function IndustryPanel({
  industry,
  outcome,
  line,
  tone,
  mobile = false,
}: {
  industry: string;
  outcome: string;
  line: string;
  tone: string;
  mobile?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative min-w-0 cursor-pointer overflow-hidden bg-darbaar transition-[flex] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        mobile ? "h-[190px] flex-none" : "flex-1 hover:flex-[2.1] focus-within:flex-[2.1]",
      )}
      tabIndex={0}
      onClick={() => track("industry_card_click", { industry })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          track("industry_card_click", { industry });
        }
      }}
    >
      <div
        className={cn(
          "absolute inset-0 origin-center bg-gradient-to-br opacity-[0.42] transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-50",
          tone,
        )}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-darbaar/45 to-darbaar-deep/[0.94]"
        aria-hidden
      />
      <span
        className="absolute right-5 top-5 size-6 opacity-60 transition duration-[400ms]"
        aria-hidden
      >
        <span className="absolute left-0 top-[11px] h-[1.5px] w-6 bg-ivory" />
        <span className="absolute left-[11px] top-0 h-6 w-[1.5px] bg-ivory transition-transform duration-[400ms] group-hover:rotate-90" />
      </span>
      <div className="absolute inset-0 flex flex-col justify-end p-[22px] text-ivory">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ivory/70">
          {outcome}
        </p>
        <h3 className="font-serif text-xl font-semibold leading-[1.14]">
          {industry}
        </h3>
        <p
          className={cn(
            "overflow-hidden text-[14.5px] leading-[1.45] text-ivory/85 transition-all duration-500",
            mobile
              ? "mt-2.5 max-h-20 opacity-100"
              : "mt-0 max-h-0 opacity-0 group-hover:mt-2.5 group-hover:max-h-[90px] group-hover:opacity-100 group-focus-within:mt-2.5 group-focus-within:max-h-[90px] group-focus-within:opacity-100",
          )}
        >
          {line}
        </p>
      </div>
    </article>
  );
}
