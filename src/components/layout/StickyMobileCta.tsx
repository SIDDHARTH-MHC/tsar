"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const enquiry = document.getElementById("enquiry");
    if (!hero || !enquiry) return;

    let pastHero = false;
    let formInView = false;

    const update = () => {
      const next = pastHero && !formInView;
      setVisible(next);
      document.body.classList.toggle("has-sticky-cta", next);
    };

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        update();
      },
      { threshold: 0.1 },
    );

    const formObs = new IntersectionObserver(
      ([entry]) => {
        formInView = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );

    heroObs.observe(hero);
    formObs.observe(enquiry);

    return () => {
      heroObs.disconnect();
      formObs.disconnect();
      document.body.classList.remove("has-sticky-cta");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-noir/10 bg-ivory/95 p-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(0.75rem, var(--safe-bottom))" }}
    >
      <Button
        href="#enquiry"
        className="h-12 w-full !py-0 text-[12px] sm:text-[13px]"
        onClick={() => track("nav_cta_click", { device: "mobile_sticky" })}
      >
        Request a Consultation
      </Button>
    </div>
  );
}
