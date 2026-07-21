import { z } from "zod";

function emptyToUndefined(v: string | undefined) {
  const t = v?.trim();
  return t && t.length > 0 ? t : undefined;
}

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name."),
  company: z.string().trim().min(2, "Please add your company name."),
  email: z
    .string()
    .trim()
    .email("That email doesn't look right - mind checking it?"),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const digits = v.replace(/\D/g, "").replace(/^91/, "");
      return digits.length === 10;
    }, "Please enter a 10-digit phone number."),
  industry: z.string().optional(),
  city: z
    .string()
    .optional()
    .refine((v) => !v || v.trim().length === 0 || v.trim().length >= 2, {
      message: "Please enter a valid city.",
    }),
  locations: z.string().optional(),
  plan: z.string().optional(),
  message: z.string().optional(),
  /** Honeypot - must stay empty */
  website: z.string().optional(),
  recaptchaToken: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  landing_variant: z.string().optional(),
  page_url: z.string().optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export type LeadPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry?: string;
  city?: string;
  locations?: string;
  plan?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_variant?: string;
  page_url?: string;
  submitted_at: string;
  lead_source: "website";
  schema_version: 1;
};

export function toLeadPayload(data: EnquiryFormValues): LeadPayload {
  const digits = data.phone.replace(/\D/g, "");
  const phone = digits.length === 12 && digits.startsWith("91")
    ? digits.slice(2)
    : digits.length === 10
      ? digits
      : data.phone;

  return {
    name: data.name.trim(),
    company: data.company.trim(),
    email: data.email.trim(),
    phone,
    industry: emptyToUndefined(data.industry),
    city: emptyToUndefined(data.city),
    locations: emptyToUndefined(data.locations),
    plan: emptyToUndefined(data.plan),
    message: emptyToUndefined(data.message),
    utm_source: emptyToUndefined(data.utm_source),
    utm_medium: emptyToUndefined(data.utm_medium),
    utm_campaign: emptyToUndefined(data.utm_campaign),
    landing_variant: emptyToUndefined(data.landing_variant),
    page_url: emptyToUndefined(data.page_url),
    submitted_at: new Date().toISOString(),
    lead_source: "website",
    schema_version: 1,
  };
}
