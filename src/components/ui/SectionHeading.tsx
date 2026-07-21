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
        <p
          className={cn(
            "mb-4 text-[13px] font-semibold uppercase tracking-[0.14em]",
            tone === "dark" ? "text-gold" : "text-gold",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "font-serif text-[32px] leading-[1.1] tracking-[-0.01em] md:text-[48px]",
          tone === "dark" ? "text-ivory" : "text-noir",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-base leading-[1.65] md:text-lg",
            tone === "dark" ? "text-ivory/75" : "text-charcoal/80",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
