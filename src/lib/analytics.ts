type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "hero_cta_click"
  | "nav_cta_click"
  | "industry_card_click"
  | "plan_cta_click"
  | "scroll_50"
  | "scroll_90"
  | "faq_open"
  | "form_start"
  | "form_error"
  | "form_submit"
  | "thankyou_view"
  | "brochure_download"
  | "explore_tsar_click"
  | "phone_click"
  | "email_click"
  | "whatsapp_click";

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined),
  );

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, cleaned);
  }

  window.gtag?.("event", event, cleaned);

  if (event === "form_submit") {
    window.fbq?.("track", "Lead", cleaned);
  }
  if (event === "brochure_download") {
    window.fbq?.("trackCustom", "BrochureDownload", cleaned);
  }
  if (event === "whatsapp_click") {
    window.fbq?.("trackCustom", "Contact", cleaned);
  }
}
