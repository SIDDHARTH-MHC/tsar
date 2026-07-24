import { FadeIn } from "@/components/ui/FadeIn";
import { WHY_DARBAAR } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function WhyDarbaar() {
  return (
    <section
      id={WHY_DARBAAR.id}
      aria-labelledby="why-darbaar-heading"
      className="section-pad bg-darbaar-deep text-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <p
            id="why-darbaar-heading"
            className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/70"
          >
            {WHY_DARBAAR.eyebrow}
          </p>

          <div className="max-w-[620px] border border-ivory/20 px-5 py-7 sm:px-8 sm:py-[30px]">
            <p className="font-serif text-[clamp(34px,4.4vw,52px)] font-semibold italic leading-none">
              {WHY_DARBAAR.definition.word}
              <span className="ml-3 align-middle font-sans text-xs font-normal not-italic uppercase tracking-[0.2em] text-ivory/60">
                {WHY_DARBAAR.definition.pos}
              </span>
            </p>
            <p className="mt-2 text-[13px] tracking-[0.05em] text-ivory/55">
              {WHY_DARBAAR.definition.pronunciation}{" "}
              <em>{WHY_DARBAAR.definition.etymology}</em>
            </p>
            <p className="mt-3.5 border-t border-ivory/20 pt-3.5 text-[16.5px] leading-[1.6] text-ivory/90">
              {WHY_DARBAAR.definition.meaning}
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-12 sm:mt-14">
          <h3 className="mb-[18px] text-xs font-semibold uppercase tracking-[0.24em] text-ivory/60">
            {WHY_DARBAAR.composed.heading}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {WHY_DARBAAR.composed.chips.map((chip) => (
              <span
                key={chip.label}
                className={cn(
                  "border border-ivory/20 px-5 py-2.5 text-[14.5px] tracking-[0.04em]",
                  chip.on
                    ? "border-ivory bg-ivory font-bold text-darbaar-deep"
                    : "text-ivory/70",
                )}
              >
                {chip.label}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ivory/85">
            {WHY_DARBAAR.composed.after}
          </p>
        </FadeIn>

        <FadeIn className="mt-12 border-t border-ivory/20 sm:mt-14">
          {WHY_DARBAAR.mapping.map((row) => (
            <div
              key={row.then}
              className="grid grid-cols-1 gap-1.5 border-b border-ivory/20 py-4 sm:grid-cols-[1fr_54px_1fr] sm:items-center sm:gap-[18px] sm:py-5"
            >
              <span className="font-serif text-[clamp(17px,1.8vw,22px)] font-normal italic text-ivory/65">
                {row.then}
              </span>
              <span
                className="w-5 text-left text-xl text-ivory/45 sm:w-auto sm:text-center"
                aria-hidden
              >
                →
              </span>
              <span className="font-serif text-[clamp(18px,2vw,25px)] font-semibold text-ivory">
                {row.now}
              </span>
            </div>
          ))}
        </FadeIn>

        <FadeIn className="mt-10 grid grid-cols-[auto_1fr] items-center gap-6 sm:mt-11">
          <div className="h-full min-h-16 w-[3px] bg-ivory" aria-hidden />
          <p className="font-serif text-[clamp(20px,2.3vw,29px)] font-semibold leading-[1.32] text-ivory">
            {WHY_DARBAAR.close.line}
            <span className="mt-2 block font-sans text-[15.5px] font-normal tracking-[0.02em] text-ivory/70">
              {WHY_DARBAAR.close.sub}
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
