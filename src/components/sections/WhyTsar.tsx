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
      className="section-pad bg-sand"
    >
      <div className="container-site">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div
              className="aspect-[4/5] w-full bg-gradient-to-br from-[#2a2218] via-[#4a3a28] to-[#1a1612] sm:aspect-[2/3] md:aspect-[3/4] lg:sticky lg:top-28 lg:max-h-[70vh]"
              aria-hidden
            >
              <div className="flex h-full items-end p-8">
                <p className="font-serif text-2xl italic text-ivory/80">
                  In-house perfumery.
                  <br />
                  Oils. Glass. Hands.
                </p>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <SectionHeading id="why-tsar-heading" title={WHY_TSAR.headline} />
            </FadeIn>

            <ul ref={listRef} className="mt-10 space-y-5">
              {WHY_TSAR.checklist.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span
                    className={cn(
                      "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-gold text-gold transition-opacity duration-500",
                      visible ? "opacity-100" : "opacity-0",
                    )}
                    style={{ transitionDelay: `${i * 200}ms` }}
                  >
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                  </span>
                  <p className="text-base leading-snug text-charcoal">
                    <strong className="font-semibold text-noir">{item.title}</strong>
                    {" - "}
                    {item.copy}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {WHY_TSAR.reasons.map((reason, i) => (
                <FadeIn key={reason.title} delay={0.1 + i * 0.08}>
                  <div className="border border-noir/10 bg-ivory p-6">
                    <h3 className="font-sans text-base font-semibold text-noir">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.65] text-charcoal/80">
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
