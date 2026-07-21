import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] border border-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}
