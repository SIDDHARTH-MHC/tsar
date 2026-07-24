import { FadeIn } from "@/components/ui/FadeIn";
import { PILLARS } from "@/lib/constants";

export function Pillars() {
  return (
    <section
      aria-labelledby="pillars-heading"
      className="border-b border-border bg-ivory py-14 sm:py-16"
    >
      <div className="container-site">
        <p
          id="pillars-heading"
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-darbaar sm:mb-6"
        >
          {PILLARS.eyebrow}
        </p>
        <FadeIn>
          <ul className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {PILLARS.items.map((item) => (
              <li
                key={item.label}
                className="py-6 first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0"
              >
                <p className="font-sans text-[clamp(40px,4.6vw,58px)] font-bold leading-none tracking-[-0.035em] text-darbaar tabular-nums">
                  {item.figure}
                </p>
                <p className="mt-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-ink">
                  {item.label}
                </p>
                <p className="mt-2 text-[14.5px] leading-[1.5] text-charcoal">
                  {item.note}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
