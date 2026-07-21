"use client";

import { Accordion } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/constants";
import { track } from "@/lib/analytics";

export function Faqs() {
  const onOpen = (question_id: string) => track("faq_open", { question_id });

  return (
    <section
      id={FAQS.id}
      aria-labelledby="faqs-heading"
      className="section-pad bg-sand"
    >
      <div className="container-site">
        <FadeIn>
          <SectionHeading
            id="faqs-heading"
            title={FAQS.headline}
            align="center"
            className="mb-8 sm:mb-10"
          />
        </FadeIn>

        <FadeIn>
          <div className="mx-auto max-w-[720px] lg:max-w-5xl">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
              <Accordion
                items={FAQS.items.slice(0, Math.ceil(FAQS.items.length / 2))}
                defaultOpenId={FAQS.items[0].id}
                onOpen={onOpen}
              />
              <Accordion
                items={FAQS.items.slice(Math.ceil(FAQS.items.length / 2))}
                defaultOpenId={undefined}
                className="lg:border-t-0"
                onOpen={onOpen}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
