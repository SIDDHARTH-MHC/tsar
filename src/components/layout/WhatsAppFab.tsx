"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/constants";
import { track } from "@/lib/analytics";

export function WhatsAppFab() {
  const [stickyUp, setStickyUp] = useState(false);

  useEffect(() => {
    const sync = () =>
      setStickyUp(document.body.classList.contains("has-sticky-cta"));

    sync();
    const classObs = new MutationObserver(sync);
    classObs.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => classObs.disconnect();
  }, []);

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      onClick={() => track("whatsapp_click", { placement: "fab" })}
      className="fixed z-40 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] ring-2 ring-white/90 transition-[transform,background-color,box-shadow] hover:scale-105 hover:bg-[#1ebe57] hover:shadow-[0_10px_32px_rgba(37,211,102,0.55)] active:scale-95 active:bg-[#18a84c] lg:size-14"
      style={{
        right: "max(1rem, var(--safe-right))",
        bottom: stickyUp
          ? "calc(var(--sticky-cta-h) + 0.75rem)"
          : "max(1.25rem, calc(var(--safe-bottom) + 1rem))",
      }}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.4 0-2.79-.36-4.03-1.05l-.29-.17-3.12.82.83-3.04-.18-.3a8.2 8.2 0 0 1-1.26-4.5c0-4.54 3.7-8.25 8.06-8.25z" />
        <path d="M8.84 7.6c-.18-.4-.37-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.66 2.66 4.12 3.62.55.23 1 .38 1.34.49.56.18 1.07.15 1.47.09.45-.07 1.38-.56 1.58-1.11.19-.54.19-1.01.13-1.11-.06-.1-.22-.16-.46-.28-.24-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.53.12-.16.24-.61.76-.75.92-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.3-.74-1.78z" />
      </svg>
    </a>
  );
}
