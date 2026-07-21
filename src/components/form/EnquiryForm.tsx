"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useForm,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { enquirySchema, type EnquiryFormValues } from "@/lib/schema";
import { ENQUIRY, SITE } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

function readUtms() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? undefined,
    utm_medium: p.get("utm_medium") ?? undefined,
    utm_campaign: p.get("utm_campaign") ?? undefined,
  };
}

function loadRecaptcha(siteKey: string) {
  return new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-recaptcha="v3"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.dataset.recaptcha = "v3";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("reCAPTCHA failed to load"));
    document.head.appendChild(script);
  });
}

async function getRecaptchaToken(siteKey: string | undefined) {
  if (!siteKey) return undefined;
  await loadRecaptcha(siteKey);
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha
        ?.execute(siteKey, { action: "enquiry" })
        .then(resolve)
        .catch(reject);
    });
  });
}

export function EnquiryForm() {
  const router = useRouter();
  const started = useRef(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      industry: "",
      city: "",
      locations: "",
      plan: "Not sure yet",
      message: "",
      website: "",
      landing_variant: "default",
      page_url: "",
      ...readUtms(),
    },
  });

  useEffect(() => {
    setValue("page_url", window.location.href);
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (
      plan &&
      ENQUIRY.planOptions.includes(plan as (typeof ENQUIRY.planOptions)[number])
    ) {
      setValue("plan", plan);
    }
  }, [setValue]);

  useEffect(() => {
    if (!siteKey) return;
    const root = document.getElementById("enquiry");
    if (!root) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void loadRecaptcha(siteKey).catch(() => undefined);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(root);
    return () => obs.disconnect();
  }, [siteKey]);

  const onFirstFocus = useCallback(() => {
    if (started.current) return;
    started.current = true;
    track("form_start", {
      prefilled_plan:
        new URLSearchParams(window.location.search).get("plan") ?? undefined,
    });
  }, []);

  const onSubmit = handleSubmit(
    async (values) => {
      setServerError(null);
      try {
        const recaptchaToken = await getRecaptchaToken(siteKey);
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, recaptchaToken }),
        });
        const body = (await res.json()) as {
          ok: boolean;
          error?: string;
          fieldErrors?: Record<string, string>;
        };

        if (!res.ok || !body.ok) {
          if (body.fieldErrors) {
            const first = Object.keys(body.fieldErrors)[0];
            track("form_error", { first_error_field: first });
          }
          setServerError(
            body.error ??
              `Something went wrong on our side. Please try again, or write to us directly at ${SITE.email} / call ${SITE.phone}.`,
          );
          return;
        }

        track("form_submit", {
          industry: values.industry,
          plan: values.plan,
          locations: values.locations,
        });
        router.push("/thank-you");
      } catch {
        setServerError(
          `Something went wrong on our side. Please try again, or write to us directly at ${SITE.email} / call ${SITE.phone}.`,
        );
      }
    },
    (formErrors) => {
      const first = Object.keys(formErrors)[0];
      track("form_error", { first_error_field: first });
      if (first) setFocus(first as keyof EnquiryFormValues);
    },
  );

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate>
      <div
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <label htmlFor="field-website">Website</label>
        <input
          id="field-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Field
        id="name"
        label="Full name"
        required
        autoComplete="name"
        error={errors.name?.message}
        registration={register("name")}
        onFocus={onFirstFocus}
      />
      <Field
        id="company"
        label="Company"
        required
        autoComplete="organization"
        error={errors.company?.message}
        registration={register("company")}
        onFocus={onFirstFocus}
      />
      <Field
        id="email"
        label="Work email"
        type="email"
        inputMode="email"
        required
        autoComplete="email"
        error={errors.email?.message}
        registration={register("email")}
        onFocus={onFirstFocus}
      />
      <Field
        id="phone"
        label="Phone"
        type="tel"
        inputMode="tel"
        required
        autoComplete="tel"
        error={errors.phone?.message}
        registration={register("phone")}
        onFocus={onFirstFocus}
        hint="+91"
      />

      <div className="border-t border-noir/10 pt-6">
        <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal/50">
          {ENQUIRY.optionalDivider}
        </p>
        <div className="space-y-6">
          <SelectField
            id="industry"
            label="Industry"
            registration={register("industry")}
            options={ENQUIRY.industryOptions}
            onFocus={onFirstFocus}
          />
          <Field
            id="city"
            label="City"
            error={errors.city?.message}
            registration={register("city")}
            onFocus={onFirstFocus}
          />
          <SelectField
            id="locations"
            label="Number of locations"
            registration={register("locations")}
            options={ENQUIRY.locationOptions}
            onFocus={onFirstFocus}
          />
          <SelectField
            id="plan"
            label="Interested in"
            registration={register("plan")}
            options={ENQUIRY.planOptions}
            allowEmpty={false}
            onFocus={onFirstFocus}
          />
          <div>
            <label
              htmlFor="field-message"
              className="mb-2 block text-sm font-medium text-noir"
            >
              Message
            </label>
            <textarea
              id="field-message"
              rows={4}
              placeholder={ENQUIRY.messagePlaceholder}
              enterKeyHint="done"
              className="input-field min-h-[120px] resize-y placeholder:text-charcoal/40"
              {...register("message")}
              onFocus={onFirstFocus}
            />
          </div>
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {Object.values(errors)
          .map((e) => e?.message)
          .filter(Boolean)
          .join(". ")}
      </div>

      {serverError ? (
        <div
          role="alert"
          className="border border-error/40 bg-error/5 px-4 py-3 text-sm text-error"
        >
          {serverError}
        </div>
      ) : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : ENQUIRY.submitLabel}
      </Button>
      <p className="text-center text-xs text-charcoal/55">{ENQUIRY.underButton}</p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  type = "text",
  inputMode,
  autoComplete,
  hint,
  registration,
  onFocus,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  hint?: string;
  registration: UseFormRegisterReturn;
  onFocus?: () => void;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-2 block text-sm font-medium text-noir">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      <div className="relative">
        {hint ? (
          <span className="pointer-events-none absolute left-4 top-1/2 z-[1] -translate-y-1/2 text-sm text-charcoal/45">
            {hint}
          </span>
        ) : null}
        <input
          id={`field-${id}`}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          enterKeyHint="next"
          aria-invalid={!!error}
          aria-describedby={error ? `error-${id}` : undefined}
          className={cn(
            "input-field",
            hint && "pl-12",
            error && "border-error",
          )}
          {...registration}
          onFocus={() => {
            onFocus?.();
          }}
        />
      </div>
      {error ? (
        <p id={`error-${id}`} className="mt-1.5 text-[13px] text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  registration,
  allowEmpty = true,
  onFocus,
}: {
  id: string;
  label: string;
  options: readonly string[];
  registration: UseFormRegisterReturn;
  allowEmpty?: boolean;
  onFocus?: () => void;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-2 block text-sm font-medium text-noir">
        {label}
      </label>
      <select
        id={`field-${id}`}
        className="input-field input-select"
        {...registration}
        onFocus={() => {
          onFocus?.();
        }}
      >
        {allowEmpty ? <option value="">Select…</option> : null}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
