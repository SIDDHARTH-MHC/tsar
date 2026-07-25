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

const fieldClass =
  "w-full min-h-[48px] rounded-none border border-ivory/34 bg-transparent px-3.5 py-3 text-[15.5px] text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-ivory aria-[invalid=true]:border-error";

const labelClass =
  "mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ivory/75";

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
    <form onSubmit={onSubmit} className="relative" noValidate>
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[18px]">
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
          placeholder="+91"
        />
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
        <div className="sm:col-span-2">
          <label htmlFor="field-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="field-message"
            rows={4}
            enterKeyHint="done"
            className={cn(fieldClass, "min-h-[100px] resize-y")}
            {...register("message")}
            onFocus={onFirstFocus}
          />
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
          className="mt-5 border border-ivory/40 bg-ivory/10 px-4 py-3 text-sm text-ivory"
        >
          {serverError}
        </div>
      ) : null}

      <div className="mt-7">
        <Button
          type="submit"
          className="btn-on-navy"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : ENQUIRY.submitLabel}
        </Button>
      </div>
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
  placeholder,
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
  placeholder?: string;
  registration: UseFormRegisterReturn;
  onFocus?: () => void;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className={labelClass}>
        {label}
        {required ? " *" : null}
      </label>
      <input
        id={`field-${id}`}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        enterKeyHint="next"
        aria-invalid={!!error}
        aria-describedby={error ? `error-${id}` : undefined}
        className={fieldClass}
        {...registration}
        onFocus={() => {
          onFocus?.();
        }}
      />
      {error ? (
        <p id={`error-${id}`} className="mt-1.5 text-[13px] text-ivory/90">
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
      <label htmlFor={`field-${id}`} className={labelClass}>
        {label}
      </label>
      <select
        id={`field-${id}`}
        className={cn(fieldClass, "input-select appearance-none")}
        {...registration}
        onFocus={() => {
          onFocus?.();
        }}
      >
        {allowEmpty ? <option value="">Select…</option> : null}
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-ink">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
