"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_TSAR } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function WhyTsar() {
  const listRef = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={WHY_TSAR.id}
      aria-labelledby="why-tsar-heading"
      className="section-pad film-grain bg-darbaar-deep text-ivory"
    >
      <div className="container-site">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div
              className="group relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-[#8F1425] via-[#6E0E1C] to-[#5E0A16] sm:aspect-[2/3] md:aspect-[3/4] lg:sticky lg:top-28 lg:max-h-[70vh]"
              aria-hidden
            >
              <div className="absolute inset-0 origin-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%),linear-gradient(160deg,#8F1425_0%,#5E0A16_70%)] transition-transform duration-[var(--duration-ambient)] ease-out group-hover:scale-[1.04]" />
              <div className="relative flex h-full items-end p-8">
                <p className="font-serif text-2xl italic text-ivory/85">
                  In-house perfumery.
                  <br />
                  Oils. Glass. Hands.
                </p>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <SectionHeading
                id="why-tsar-heading"
                title={WHY_TSAR.headline}
                tone="dark"
              />
            </FadeIn>

            <ul ref={listRef} className="mt-10 space-y-5">
              {WHY_TSAR.checklist.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span
                    className={cn(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-gold text-gold transition-opacity duration-500",
                      visible ? "opacity-100" : "opacity-0",
                    )}
                    style={{ transitionDelay: `${i * 200}ms` }}
                  >
                    <Check className="size-3.5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <p className="text-base leading-[1.7] text-ivory/70">
                    <strong className="font-semibold text-ivory">{item.title}</strong>
                    {" - "}
                    {item.copy}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {WHY_TSAR.reasons.map((reason, i) => (
                <FadeIn key={reason.title} delay={0.1 + i * 0.08}>
                  <div className="border border-ivory/20 bg-darbaar/30 p-6 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-luxury)] hover:-translate-y-0.5 hover:border-ivory/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]">
                    <h3 className="font-sans text-base font-semibold text-ivory">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.7] text-ivory/70">
                      {reason.copy}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
