"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const enquiry = document.getElementById("enquiry");
    if (!hero || !enquiry) return;

    let pastHero = false;
    let formInView = false;

    const update = () => setVisible(pastHero && !formInView);

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );

    const formObs = new IntersectionObserver(
      ([entry]) => {
        formInView = entry.isIntersecting;
        update();
      },
      { threshold: 0.2 },
    );

    heroObs.observe(hero);
    formObs.observe(enquiry);

    return () => {
      heroObs.disconnect();
      formObs.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-noir/10 bg-ivory p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <Button href="#enquiry" className="h-14 w-full !py-0">
        Request a Consultation
      </Button>
    </div>
  );
}
