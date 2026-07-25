import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { CLIENTS } from "@/lib/constants";

export function Clients() {
  const loop = [...CLIENTS.items, ...CLIENTS.items];

  return (
    <section
      id={CLIENTS.id}
      aria-labelledby="clients-heading"
      className="section-pad overflow-hidden bg-darbaar text-ivory"
    >
      <div className="container-site">
        <FadeIn>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/70">
            {CLIENTS.eyebrow}
          </p>
          <h2
            id="clients-heading"
            className="font-serif text-section text-balance text-ivory"
          >
            {CLIENTS.headline}
          </h2>
        </FadeIn>
      </div>

      <div className="clients-marquee relative mt-10 overflow-hidden">
        <div className="clients-marquee-track flex w-max gap-5">
          {loop.map((client, i) => (
            <article
              key={`${client.name}-${i}`}
              className="flex w-[270px] shrink-0 flex-col bg-ivory p-[22px_26px_26px] text-ink sm:w-[326px]"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-darbaar">
                {client.segment}
              </span>
              <div className="my-[18px] mb-5 flex h-[72px] items-center justify-center overflow-hidden border border-ink/10 bg-paper-2/60 px-3">
                {"logo" in client && client.logo ? (
                  <Image
                    src={client.logo}
                    alt=""
                    width={220}
                    height={72}
                    className="max-h-[58px] w-auto max-w-full object-contain"
                  />
                ) : (
                  <span
                    className="text-[9.5px] uppercase tracking-[0.24em] text-charcoal/55"
                    aria-hidden
                  >
                    Logo
                  </span>
                )}
              </div>
              <h3 className="font-serif text-[21px] font-semibold leading-[1.18] text-ink">
                {client.name}
              </h3>
              <p className="mt-3 border-t border-border pt-3.5 font-serif text-base italic leading-[1.48] text-charcoal">
                &ldquo;{client.quote}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
