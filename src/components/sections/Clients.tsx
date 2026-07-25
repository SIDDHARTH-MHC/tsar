import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { CLIENTS } from "@/lib/constants";
import { cn } from "@/lib/cn";

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
          {loop.map((client, i) => {
            const hasLogo = "logo" in client && Boolean(client.logo);
            const fit =
              "logoFit" in client && client.logoFit === "cover"
                ? "cover"
                : "contain";

            return (
              <article
                key={`${client.name}-${i}`}
                className="flex w-[280px] shrink-0 flex-col overflow-hidden bg-ivory text-ink sm:w-[320px]"
              >
                <div
                  className={cn(
                    "relative h-[128px] w-full",
                    fit === "contain" ? "bg-white" : "bg-ink",
                  )}
                >
                  {hasLogo ? (
                    <Image
                      src={client.logo!}
                      alt=""
                      fill
                      sizes="320px"
                      className={cn(
                        fit === "cover"
                          ? "object-cover object-center"
                          : "object-contain object-center p-7 sm:p-8",
                      )}
                    />
                  ) : (
                    <div
                      className="flex h-full items-center justify-center bg-paper-2"
                      aria-hidden
                    >
                      <span className="font-serif text-[42px] font-semibold leading-none tracking-[-0.04em] text-darbaar/35">
                        {client.name
                          .split(/\s+/)
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-[22px_26px_26px]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-darbaar">
                    {client.segment}
                  </span>
                  <h3 className="mt-3 font-serif text-[21px] font-semibold leading-[1.18] text-ink">
                    {client.name}
                  </h3>
                  <p className="mt-3 border-t border-border pt-3.5 font-serif text-base italic leading-[1.48] text-charcoal">
                    &ldquo;{client.quote}&rdquo;
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
