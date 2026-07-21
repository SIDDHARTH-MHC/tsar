import { EnquiryForm } from "@/components/form/EnquiryForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { ENQUIRY, SITE, whatsappHref } from "@/lib/constants";

export function EnquirySection() {
  return (
    <section
      id={ENQUIRY.id}
      aria-labelledby="enquiry-heading"
      className="scroll-mt-20 bg-ivory"
    >
      <div className="grid lg:grid-cols-5">
        <div className="film-grain bg-noir px-6 py-16 text-ivory md:px-12 lg:col-span-2 lg:px-14 lg:py-24">
          <FadeIn>
            <h2
              id="enquiry-heading"
              className="font-serif text-[36px] leading-[1.1] tracking-[-0.01em] md:text-[44px]"
            >
              {ENQUIRY.headline}
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.65] text-ivory/75">
              {ENQUIRY.reassurance}
            </p>
            <div className="mt-10 space-y-2 text-sm">
              <p className="text-ivory/55">{ENQUIRY.preferTalk}</p>
              <p>
                <a href={SITE.phoneHref} className="gold-underline text-ivory">
                  {SITE.phone}
                </a>
                <span className="mx-2 text-ivory/40">·</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="gold-underline text-ivory"
                >
                  {SITE.email}
                </a>
              </p>
              <p className="pt-4">
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gold gold-underline"
                >
                  {ENQUIRY.whatsappLabel}
                </a>
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="bg-ivory px-6 py-16 md:px-12 lg:col-span-3 lg:px-16 lg:py-24">
          <FadeIn>
            <EnquiryForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
