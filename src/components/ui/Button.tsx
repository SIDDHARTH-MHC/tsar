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
    "btn-luxury-primary bg-gold text-navy border border-transparent",
  secondary:
    "btn-luxury-secondary bg-transparent text-ivory border border-champagne/70",
  ghost:
    "btn-luxury-ghost bg-transparent text-navy border border-border",
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
    "btn-luxury inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase rounded-[var(--radius-xs)] disabled:opacity-60 disabled:pointer-events-none group touch-manipulation sm:px-8",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight className="btn-arrow size-4 shrink-0" aria-hidden />
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
