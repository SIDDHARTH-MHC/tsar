"use client";

import { Accordion } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";
import { FAQS } from "@/lib/constants";
import { track } from "@/lib/analytics";

export function Faqs() {
  const onOpen = (question_id: string) => track("faq_open", { question_id });
  const mid = Math.ceil(FAQS.items.length / 2);

  return (
    <section
      id={FAQS.id}
      aria-labelledby="faqs-heading"
      className="section-pad bg-sand"
    >
      <div className="container-site">
        <FadeIn>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-darbaar">
            {FAQS.eyebrow}
          </p>
          <h2
            id="faqs-heading"
            className="font-serif text-section text-balance text-ink"
          >
            {FAQS.headline}
          </h2>
        </FadeIn>

        <FadeIn className="mt-9">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-11">
            <Accordion
              items={FAQS.items.slice(0, mid)}
              defaultOpenId={FAQS.items[0].id}
              onOpen={onOpen}
            />
            <Accordion
              items={FAQS.items.slice(mid)}
              defaultOpenId={undefined}
              className="lg:border-t-0"
              onOpen={onOpen}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
