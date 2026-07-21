"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  defaultOpenId?: string;
  className?: string;
  onOpen?: (id: string) => void;
};

export function Accordion({
  items,
  defaultOpenId,
  className,
  onOpen,
}: AccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId);

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-[var(--radius-sm)] border border-transparent px-3 transition-[background-color,border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-luxury)] sm:px-4",
              isOpen
                ? "border-gold/30 bg-champagne/35 shadow-[inset_0_0_0_1px_rgba(184,146,91,0.12)]"
                : "hover:bg-champagne/20",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left sm:gap-6 sm:py-4"
                onClick={() => {
                  const next = isOpen ? undefined : item.id;
                  setOpenId(next);
                  if (next) onOpen?.(next);
                }}
              >
                <span
                  className={cn(
                    "font-sans text-base font-semibold leading-snug transition-colors duration-[var(--duration-base)] md:text-lg",
                    isOpen ? "text-navy" : "text-navy/85",
                  )}
                >
                  {item.question}
                </span>
                <Plus
                  className={cn(
                    "size-5 shrink-0 text-gold transition-transform duration-[var(--duration-base)] ease-[var(--ease-luxury)]",
                    isOpen && "rotate-45",
                  )}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-[320ms] ease-[var(--ease-luxury)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "pb-4 text-base leading-[1.72] text-charcoal transition-opacity duration-[var(--duration-base)]",
                    isOpen ? "opacity-100" : "opacity-0",
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
