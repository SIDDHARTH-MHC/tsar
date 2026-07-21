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
      className="scroll-mt-[calc(var(--header-h)+var(--safe-top)+12px)] bg-ivory"
    >
      <div className="grid lg:grid-cols-5">
        <div className="film-grain bg-noir px-5 py-12 text-ivory sm:px-8 sm:py-16 md:px-12 lg:col-span-2 lg:px-14 lg:py-24">
          <FadeIn>
            <h2
              id="enquiry-heading"
              className="font-serif text-section text-balance tracking-[-0.01em]"
            >
              {ENQUIRY.headline}
            </h2>
            <p className="mt-4 max-w-md text-lede text-pretty text-ivory/75 sm:mt-5">
              {ENQUIRY.reassurance}
            </p>
            <div className="mt-8 space-y-3 text-sm sm:mt-10">
              <p className="text-ivory/55">{ENQUIRY.preferTalk}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex min-h-11 items-center gold-underline text-ivory"
                  onClick={() =>
                    track("phone_click", { placement: "enquiry_panel" })
                  }
                >
                  {SITE.phone}
                </a>
                <span className="hidden text-ivory/40 sm:inline">·</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-11 items-center break-all gold-underline text-ivory"
                  onClick={() =>
                    track("email_click", { placement: "enquiry_panel" })
                  }
                >
                  {SITE.email}
                </a>
              </div>
              <p className="pt-2">
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center font-semibold text-gold gold-underline"
                  onClick={() =>
                    track("whatsapp_click", { placement: "enquiry_panel" })
                  }
                >
                  {ENQUIRY.whatsappLabel}
                </a>
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="bg-ivory px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:col-span-3 lg:px-16 lg:py-24">
          <FadeIn>
            <EnquiryForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
