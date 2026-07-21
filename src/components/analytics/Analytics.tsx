"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { track } from "@/lib/analytics";

function ScrollDepthTracker() {
  useEffect(() => {
    const fired = { fifty: false, ninety: false };

    const onScroll = () => {
      const doc = document.documentElement;
      const ratio =
        (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1);
      if (!fired.fifty && ratio >= 0.5) {
        fired.fifty = true;
        track("scroll_50");
      }
      if (!fired.ninety && ratio >= 0.9) {
        fired.ninety = true;
        track("scroll_90");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}

function ClarityScript({ id }: { id: string }) {
  useEffect(() => {
    if (!id) return;
    type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
    const w = window as Window & { clarity?: ClarityFn };
    if (!w.clarity) {
      const queue: unknown[] = [];
      const clarity: ClarityFn = (...args: unknown[]) => {
        queue.push(args);
      };
      clarity.q = queue;
      w.clarity = clarity;
    }
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.clarity.ms/tag/${id}`;
    document.head.appendChild(s);
  }, [id]);

  return null;
}

function MetaPixel({ id }: { id: string }) {
  useEffect(() => {
    if (!id) return;
    type Fbq = ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
    };

    const w = window as Window & { fbq?: Fbq; _fbq?: Fbq };
    if (w.fbq) return;

    const fbq: Fbq = (...args: unknown[]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    w.fbq = fbq;
    w._fbq = fbq;

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    fbq("init", id);
    fbq("track", "PageView");
  }, [id]);

  return null;
}

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      <ScrollDepthTracker />
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {pixelId ? <MetaPixel id={pixelId} /> : null}
      {clarityId ? <ClarityScript id={clarityId} /> : null}
    </>
  );
}
