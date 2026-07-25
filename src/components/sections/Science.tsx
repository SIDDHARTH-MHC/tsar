import { FadeIn } from "@/components/ui/FadeIn";
import { SCIENCE } from "@/lib/constants";

export function Science() {
  return (
    <section
      aria-labelledby="science-heading"
      className="section-pad bg-darbaar text-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/70">
            {SCIENCE.eyebrow}
          </p>
          <h2
            id="science-heading"
            className="max-w-[19ch] font-serif text-section text-balance text-ivory"
          >
            {SCIENCE.headline}
          </h2>
          <div className="mt-[18px] h-0.5 w-[52px] bg-ivory/50" aria-hidden />
        </FadeIn>

        <FadeIn className="mt-11">
          <ul className="grid grid-cols-1 divide-y divide-ivory/20 md:grid-cols-4 md:divide-x md:divide-y-0">
            {SCIENCE.stats.map((stat, index) => (
              <li
                key={stat.figure}
                className={
                  index === 0
                    ? "py-6 first:pt-0 md:py-0 md:pr-6 md:pt-8"
                    : index === SCIENCE.stats.length - 1
                      ? "py-6 last:pb-0 md:py-0 md:pl-6 md:pt-8"
                      : "py-6 md:px-6 md:py-0 md:pt-8"
                }
              >
                <p className="font-sans text-[clamp(38px,4.4vw,54px)] font-bold leading-none tracking-[-0.035em] tabular-nums text-ivory">
                  {stat.figure}
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.48] text-ivory/75">
                  {stat.copy}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
