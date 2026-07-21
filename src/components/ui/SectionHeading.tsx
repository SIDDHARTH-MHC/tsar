import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold sm:mb-4 sm:text-[13px]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "font-serif text-section text-balance",
          tone === "dark" ? "text-ivory" : "text-navy",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-4 text-lede text-pretty sm:mt-5",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-ivory/75" : "text-charcoal",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
