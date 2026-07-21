"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
};

function useIsMobileMotion() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: FadeInProps) {
  const reduce = useReducedMotion();
  const mobile = useIsMobileMotion();
  const Component = m[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const travel = mobile ? Math.min(y, 16) : y;
  const duration = mobile ? 0.4 : 0.65;
  const stagger = mobile ? delay * 0.5 : delay;

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: mobile ? "-40px" : "-80px" }}
      transition={{
        duration,
        delay: stagger,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </Component>
  );
}
