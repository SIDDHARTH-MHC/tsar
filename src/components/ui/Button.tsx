import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-noir hover:bg-gold-deep active:bg-gold-deep border border-transparent",
  secondary:
    "bg-transparent text-ivory border border-ivory/70 hover:bg-ivory/10 active:bg-ivory/15",
  ghost:
    "bg-transparent text-noir border border-noir/20 hover:bg-noir/[0.08] active:bg-noir/[0.12]",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  disabled,
  showArrow = false,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-[var(--duration-fast)] ease-out rounded-[var(--radius-xs)] disabled:opacity-60 disabled:pointer-events-none group touch-manipulation sm:px-8",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
          aria-hidden
        />
      ) : null}
    </>
  );

  if (href) {
    const isHash = href.startsWith("#");
    if (isHash) {
      return (
        <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
