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
    <div className={cn("divide-y divide-noir/10", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id} className="py-5">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-start justify-between gap-6 text-left"
                onClick={() => {
                  const next = isOpen ? undefined : item.id;
                  setOpenId(next);
                  if (next) onOpen?.(next);
                }}
              >
                <span className="font-sans text-base font-semibold leading-snug text-noir md:text-lg">
                  {item.question}
                </span>
                <Plus
                  className={cn(
                    "mt-1 size-5 shrink-0 text-gold transition-transform duration-[var(--duration-base)]",
                    isOpen && "rotate-45",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-[250ms] ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pt-4 text-base leading-[1.65] text-charcoal/80">
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
