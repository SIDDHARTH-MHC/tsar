"use client";

import { EnquiryForm } from "@/components/form/EnquiryForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { ENQUIRY, SITE, whatsappHref } from "@/lib/constants";
import { track } from "@/lib/analytics";

export function EnquirySection() {
  return (
    <section
      id={ENQUIRY.id}
      aria-labelledby="enquiry-heading"
      className="scroll-mt-[calc(var(--header-h)+var(--safe-top)+12px)] section-pad bg-darbaar text-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/70">
            {ENQUIRY.eyebrow}
          </p>
          <h2
            id="enquiry-heading"
            className="font-serif text-section text-balance tracking-[-0.018em]"
          >
            {ENQUIRY.headline}
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-[1.5fr_0.8fr] lg:gap-14">
          <FadeIn>
            <EnquiryForm />
          </FadeIn>

          <FadeIn
            delay={0.08}
            className="border-t border-ivory/20 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          >
            <h3 className="font-serif text-[21px] font-semibold text-ivory">
              {ENQUIRY.sideTitle}
            </h3>
            <div className="mt-3">
              <a
                href={`mailto:${SITE.email}`}
                className="block border-b border-ivory/15 py-2.5 text-[15.5px] text-ivory/85 transition-colors hover:text-ivory"
                onClick={() =>
                  track("email_click", { placement: "enquiry_panel" })
                }
              >
                {SITE.email}
              </a>
              <a
                href={SITE.phoneHref}
                className="block border-b border-ivory/15 py-2.5 text-[15.5px] text-ivory/85 transition-colors hover:text-ivory"
                onClick={() =>
                  track("phone_click", { placement: "enquiry_panel" })
                }
              >
                {SITE.phone}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-ivory/15 py-2.5 text-[15.5px] text-ivory/85 transition-colors hover:text-ivory"
                onClick={() =>
                  track("whatsapp_click", { placement: "enquiry_panel" })
                }
              >
                {ENQUIRY.whatsappLabel}
              </a>
            </div>
            <p className="mt-6 text-[14.5px] leading-[1.6] text-ivory/70">
              {ENQUIRY.responsePromise}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
